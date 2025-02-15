"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { cairo200,cairo100 } from "../../../../fonts";
const EditArticleModal = ({ isOpen, closeModal, articleData, onEdit }) => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(""); // إضافة حالة لتخزين رابط الصورة
  const [articleId, setArticleId] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (articleData) {
      setDescription(articleData.description || "");
      setArticleId(articleData._id || "");
      setImageUrl(articleData.imageUrl || ""); // تعيين الصورة الحالية إذا لم يتم تغييرها
    }
  }, [articleData]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let newImageUrl = imageUrl; // استخدام الصورة الحالية إذا لم يتم تغييرها

    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "next_cloudinary_app");

      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        if (data.secure_url) {
          newImageUrl = data.secure_url;
          setImageUrl(newImageUrl); // تحديث حالة `imageUrl`
        } else {
          throw new Error("فشل تحميل الصورة");
        }
      } catch (error) {
        toast.error("حدث خطأ أثناء تحميل الصورة");
        setLoading(false);
        return;
      }
    }

    const updatedArticle = { description, imageUrl: newImageUrl };

    console.log("بيانات الطلب قبل الإرسال:", updatedArticle); // طباعة البيانات قبل الإرسال

    try {
      const res = await fetch(`/api/article/${articleId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedArticle),
      });

      if (!res.ok) throw new Error("فشل تحديث المقالة");

      toast.success("تم التعديل بنجاح");
      onEdit(articleId, updatedArticle);
      setTimeout(() => router.back(), 2000);
    } catch (error) {
      toast.error("حدث خطأ أثناء التعديل");
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#041126] text-white p-6 rounded-lg shadow-lg w-96">
        <h2 className={`text-xl font-bold mb-4 ${cairo200.className}`}>تعديل المقالة</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className={`block text-white text-sm font-medium ${cairo100.className}`}>الوصف</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>

          <div className="mb-4">
            <label className={`block text-sm text-white font-medium ${cairo100.className}`}>تحميل صورة جديدة (اختياري)</label>
            <input type="file" accept="image/*" onChange={handleImageChange} className="w-full" />
          </div>

          {imageUrl && (
            <div className="mb-4">
              <p className={`text-sm ${cairo100.className}`}>الصورة الحالية:</p>
              <Image src={imageUrl} alt="Current" className="w-[75px] h-auto rounded-lg" width={50} height={50} />
            </div>
          )}

          <div className="flex justify-between items-center space-x-2">


            <button type="submit" className={`bg-blue-600 text-white px-4 py-2 rounded w-full ${cairo100.className}`} disabled={loading}>
              {loading ? "جاري التحديث..." : "تحديث المقالة"}
            </button>
            <button
              type="button"
              onClick={closeModal}
              className={`bg-gray-100 text-black px-4 py-2 rounded-lg hover:bg-gray-500  mr-1`}
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditArticleModal;
