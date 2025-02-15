'use client'
import React, { useEffect, useState } from 'react';
import Breadcrumb from '@/app/components/Breadcrumbs/Breadcrumb';
import ActionButton from '@/app/components/Forms/ActionButton';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import FetchData from '../../../../Servers/FetchData';
import DeleteModal from '@/app/components/DeleteModal';
import EditOfferModal from '@/app/components/models/EditOfferModal';
import { ToastContainer, toast } from 'react-toastify';
import { cairo100, cairo200 } from '../../../../fonts';
import Head from '@/head';
import Loading from '@/app/components/Loading';
function OffersPage() {
  const [contactData, setContactData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [sectionIdToDelete, setSectionIdToDelete] = useState(null);
  const [offerToEdit, setOfferToEdit] = useState(null);


  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      const data = await FetchData('offers', 'Offerss');
      if (data) {
        setContactData(data);
      }
      setLoading(false);
    };

    fetchContacts();
  }, []);

  const openEditModal = (offer) => {
    if (offer) {
      setOfferToEdit(offer);
      setIsEditModalOpen(true);
    }
  };

  const closeEditModal = () => {
    setOfferToEdit(null);
    setIsEditModalOpen(false);
  };


  const handleEdit = async (updatedOffer) => {
    try {
      const res = await fetch(`/api/offers/${offerToEdit._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedOffer),
      });
      if (!res.ok) {
        throw new Error('Failed to update');
      }
      const updatedData = await res.json();
      setContactData((prevData) =>
        prevData.map((item) => (item._id === offerToEdit._id ? updatedData : item))
      );
      toast.success('تم التعديل بنجاح');
    } catch (error) {
      toast.error('حدث خطأ أثناء التعديل');
    } finally {
      closeEditModal();
    }
  };

  const openDeleteModal = (id) => {
    setSectionIdToDelete(id);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setSectionIdToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/offers/${sectionIdToDelete}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error('Failed to delete');
      }
      setContactData((prevData) => prevData.filter((item) => item._id !== sectionIdToDelete));
      toast.success('تم الحذف بنجاح');
    } catch (error) {
      toast.error('حدث خطأ أثناء الحذف');
    } finally {
      closeDeleteModal();
    }
  };

  return (
    <div className="px-4 py-6 bg-[#0A1931] min-h-screen">
      <Head title={'لوحة التحكم -  العروض'} />
      <Breadcrumb lable=" العروض" />
      <div className="flex flex-row md:flex-row justify-between items-center py-6 gap-4">
        <p className={`text-xl md:text-2xl  font-bold text-white ${cairo100.className}`}>العروض </p>
        <ActionButton href="/admin/offers/create" label="إضافة عرض  جديد" />
      </div>
      <div className="mt-6 overflow-x-auto bg-[#111a30] rounded-lg shadow-md" dir="rtl">
        {loading ? (
          <Loading />
        ) : (
          <table className="table-auto w-full min-w-[600px] ">
            <thead className="bg-[#0A1931] border-b-2 ">
              <tr>
                <th className={`px-4 py-3 text-sm text-black font-semibold text-center ${cairo200.className}`}>عنوان العرض</th>
                <th className={`px-4 py-3 text-sm text-black font-semibold text-center ${cairo200.className}`}>وصف العرض</th>
                <th className={`px-4 py-3 text-sm text-black font-semibold text-center ${cairo200.className}`}>السعر</th>
                <th className={`px-4 py-3 text-sm text-black font-semibold text-center ${cairo200.className}`}>التاريخ</th>
                <th className={`px-4 py-3 text-sm text-black font-semibold text-center ${cairo200.className}`}>العمليات</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {contactData.map((offer) => (
                <tr key={offer._id} className="bg-[#163266]  hover:bg-[#14284b]">
                  <td className={`px-4 py-3 text-sm text-white whitespace-nowrap text-center ${cairo100.className}`}>{offer.title}</td>
                  <td className={`px-4 py-3 text-sm text-white whitespace-nowrap text-center ${cairo100.className}`}>{offer.description}</td>
                  <td className={`px-4 py-3 text-sm text-white whitespace-nowrap text-center ${cairo100.className}`}>
                    <span className="p-1.5 text-xs font-medium text-green-800 bg-green-200 rounded-lg">
                      {offer.price}
                    </span>
                  </td>
                  <td className={`px-4 py-3 text-sm text-white whitespace-nowrap text-center ${cairo100.className}`}>
                    {new Date(offer.date).toLocaleDateString()}
                  </td>
                  <td className="px-2 lg:px-6 py-4 whitespace-nowrap text-center  flex justify-center gap-2 ">
                    <button
                      className="text-white hover:bg-blue-700 rounded-full  px-2 py-2 "
                      onClick={() => openEditModal(offer)}
                    >
                      <CiEdit className="text-lg" />

                    </button>
                    <button
                      className="text-white hover:bg-red-700  rounded-full  px-2 py-2"
                      onClick={() => openDeleteModal(offer._id)}
                    >
                      <MdDeleteOutline className="text-lg" />

                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* نموذج التعديل */}
      <EditOfferModal
        isOpen={isEditModalOpen}
        closeModal={closeEditModal}
        offerData={offerToEdit}
        onEdit={handleEdit}
      />

      <DeleteModal
        isModalOpen={isDeleteModalOpen}
        closeModal={closeDeleteModal}
        handleDelete={handleDelete}
      />

      <ToastContainer />
    </div>
  );
}

export default OffersPage;
