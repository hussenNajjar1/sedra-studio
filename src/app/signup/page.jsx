"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify"; // إشعارات Toast
import "react-toastify/dist/ReactToastify.css"; // استيراد CSS للإشعارات
import LableForm from "../components/Forms/LableForm";
import { cairo200, cairo100 } from "../../../fonts";


export default function SignupPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json(); // الحصول على الرد من الخادم

    if (res.ok) {
      toast.success("تم إنشاء الحساب بنجاح!");
      router.push("/login");
    } else {
      toast.error(result.message || "فشل في التسجيل. حاول مرة أخرى.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 signup">
      <div className="bg-[#1F0C3A ]  border border-[#3f216d]  p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className={`text-2xl font-bold text-center  mb-6 text-white  ${cairo200.className}`}>إنشاء حساب</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-3">
            <div className="text-right">
              <LableForm lable="الاسم " />
            </div>
            <input
              type="text"
              placeholder="الاسم"
              className={`w-full p-3 border  text-black  border-gray-300  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  text-right ${cairo100.className}`}
              {...register("name", { required: "الاسم مطلوب" })}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div className="space-y-3">
            <div className="text-right">
              <LableForm lable="البريد الإلكتروني " />
            </div>
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              className={`w-full p-3 border  text-black  border-gray-300  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  text-right ${cairo100.className}`}
              {...register("email", { required: "البريد الإلكتروني مطلوب" })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="space-y-3">
            <div className="text-right">
              <LableForm lable="كلمة المرور " />
            </div>
            <input
              type="password"
              placeholder="كلمة المرور"
              className={`w-full p-3 border  text-black  border-gray-300  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  text-right ${cairo100.className}`}
              {...register("password", { required: "كلمة المرور مطلوبة", minLength: { value: 6, message: "يجب أن تكون 6 أحرف على الأقل" } })}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div>
            <button
              type="submit"
              className={`w-full p-3 bg-[#341361] text-white rounded-lg hover:bg-[#41206e] transition duration-200 ${cairo100.className}`}
            >
              إنشاء حساب
            </button>
          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
}
