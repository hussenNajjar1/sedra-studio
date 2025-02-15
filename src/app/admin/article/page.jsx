'use client';

import React, { useEffect, useState } from 'react';
import Breadcrumb from '@/app/components/Breadcrumbs/Breadcrumb';
import ActionButton from '@/app/components/Forms/ActionButton';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import FetchData from '../../../../Servers/FetchData';
import Image from 'next/image';
import DeleteModal from '@/app/components/DeleteModal';
import EditArticleModal from '@/app/components/models/EditArticleModal';
import { ToastContainer, toast } from 'react-toastify';
import { cairo100,cairo200 } from '../../../../fonts';
import Head from '@/head';
import Loading from '@/app/components/Loading';

function ArticlePage() {
  const [articleData, setArticleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
  const [articleToEdit, setArticleToEdit] = useState(null); 
  const [sectionIdToDelete,setSectionIdToDelete]=useState(null)

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      const data = await FetchData('article', 'articles');
      if (data) {
        setArticleData(data);
      }
      setLoading(false);
    };

    fetchArticles();
  }, []);

  const openDeleteModal = (id) => {
    setSectionIdToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSectionIdToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const openEditModal = (article) => {
    setArticleToEdit(article);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setArticleToEdit(null);
    setIsEditModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/article/${sectionIdToDelete}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error('Failed to delete');
      }
      setArticleData((prevData) => prevData.filter((item) => item._id !== sectionIdToDelete));
      toast.success('تم الحذف بنجاح');
    } catch (error) {
      toast.error('حدث خطأ أثناء الحذف');
    } finally {
      closeDeleteModal();
    }
  };
  const handleEdit = async (updatedArticle) => {
    try {
      const res = await fetch(`/api/article/${articleToEdit._id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedArticle),
      });
      if (!res.ok) {
        throw new Error('Failed to update');
      }
      const updatedData = await res.json();
      setArticleData((prevData) =>
        prevData.map((item) => (item._id === articleToEdit._id ? updatedData : item))
      );
      toast.success('تم التعديل بنجاح');
    } catch (error) {
      toast.error('حدث خطأ أثناء التعديل');
    } finally {
      closeEditModal();
    }
  };


  return (
    <div className="px-4 py-6 bg-[#0A1931] min-h-screen">
      <Head title="لوحة التحكم - المقالات" />
      <Breadcrumb lable="المقالات" />
      <div className="flex flex-row md:flex-row justify-between items-center py-6 gap-4">
        <p className={`text-2xl font-bold text-white" ${cairo100.className}`}>المقالات</p>
        <ActionButton href="/admin/article/create" label="إضافة مقالة جديدة" />
      </div>

      <div className="mt-6 overflow-x-auto">
        {loading ? (
          <Loading />
        ) : (
          <div className="w-full">
            <table className="min-w-[800px] bg-[#10274d] rounded-lg shadow-md overflow-hidden">
              <thead>
                <tr className="bg-red-700">
                  <th className={`px-6 py-3 text-center text-black text-sm font-semibold whitespace-nowrap ${cairo200.className}`}>الوصف</th>
                  <th className={`px-6 py-3 text-center text-black text-sm font-semibold whitespace-nowrap ${cairo200.className}`}>الصورة</th>
                  <th className={`px-6 py-3 text-center text-black text-sm font-semibold whitespace-nowrap ${cairo200.className}`}>العمليات</th>
                </tr>
              </thead>
              <tbody>
                {articleData.map((article) => (
                  <tr key={article._id} className="border-b bg-[#163266]  hover:bg-[#14284b]">
                    <td className={`px-6 py-4 text-sm text-center text-white whitespace-nowrap ${cairo100.className}`}>
                      {article.description}
                    </td>
                    <td className="px-6 py-4 text-sm text-center text-white whitespace-nowrap">
                      <Image
                        src={article.imageUrl}
                        alt="Article Image"
                        width={50}
                        height={50}
                        className="object-cover rounded-lg md:mr-[150px] mr-[90px] "
                      />
                    </td>
                    <td className="px-6 py-4 text-center flex justify-center gap-2 border-0 pt-12 ">
                      <button
                        className="text-white hover:bg-blue-700 rounded-full  px-2 py-2"
                        onClick={() => openEditModal(article)} 
                      >
                        <CiEdit className="text-lg" />
                      </button>
                      <button
                        className="text-white hover:bg-red-700  rounded-full  px-2 py-2"
                        onClick={() => openDeleteModal(article._id)}
                      >
                        <MdDeleteOutline className="text-lg" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <DeleteModal
        isModalOpen={isDeleteModalOpen}
        closeModal={closeDeleteModal}
        handleDelete={handleDelete}
      />

      <EditArticleModal
        isOpen={isEditModalOpen}
        closeModal={closeEditModal}
        articleData={articleToEdit}
        onEdit={handleEdit}
      />

      <ToastContainer />
    </div>
  );
}

export default ArticlePage;
