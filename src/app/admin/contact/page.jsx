'use client';
import React, { useEffect, useState } from 'react';
import Breadcrumb from '@/app/components/Breadcrumbs/Breadcrumb';
import ActionButton from '@/app/components/Forms/ActionButton';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import FetchData from '../../../../Servers/FetchData';
import DeleteModal from '@/app/components/DeleteModal';
import { ToastContainer, toast } from 'react-toastify';
import EditContactModel from '@/app/components/models/EditContactModel';
import Loading from '@/app/components/Loading';
import { cairo100, cairo200 } from '../../../../fonts';

import Head from '@/head';
import { FaWhatsapp } from 'react-icons/fa';
function ContactPage() {
    const [contactData, setContactData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [contactIdToDelete, setContactIdToDelete] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [contactToEdit, setContactToEdit] = useState(null);

    useEffect(() => {
        const fetchContacts = async () => {
            setLoading(true);
            const data = await FetchData('contact', 'Contacts');
            if (data) setContactData(data);
            setLoading(false);
        };

        fetchContacts();
    }, []);

    const sendWhatsAppMessage = (phone) => {
        const url = `https://wa.me/${phone}`;
        window.open(url, '_blank');
    };

    const openDeleteModal = (id) => {
        setContactIdToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setContactIdToDelete(null);
        setIsDeleteModalOpen(false);
    };

    const openEditModal = (contact) => {
        if (contact) {
            setContactToEdit(contact);
            setIsEditModalOpen(true);
        }
    };

    const closeEditModal = () => {
        setContactToEdit(null);
        setIsEditModalOpen(false);
    };

    const handleEdit = async (updatedContact) => {
        try {
            const res = await fetch(`/api/contact/${contactToEdit._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedContact),
            });

            if (!res.ok) throw new Error('Failed to update');

            const updatedData = await res.json();
            setContactData((prevData) =>
                prevData.map((item) => (item._id === contactToEdit._id ? updatedData : item))
            );

            toast.success('تم التعديل بنجاح');
        } catch (error) {
            toast.error('حدث خطأ أثناء التعديل');
        } finally {
            closeEditModal();
        }
    };

    const handleDelete = async () => {
        try {
            const res = await fetch(`/api/contact/${contactIdToDelete}`, { method: "DELETE" });
            if (!res.ok) throw new Error('Failed to delete');

            setContactData((prevData) => prevData.filter((item) => item._id !== contactIdToDelete));
            toast.success('تم الحذف بنجاح');
        } catch (error) {
            toast.error('حدث خطأ أثناء الحذف');
        } finally {
            closeDeleteModal();
        }
    };

    return (
        <div className="px-4 py-6 bg-[#0A1931] min-h-screen">
            <Head title="لوحة التحكم - فورمات التواصل" />
            <Breadcrumb lable="فورمات التواصل" />
            <div className="flex flex-row md:flex-row justify-between items-center py-6 gap-4 md:gap-8">
                <p className={`text-xl md:text-2xl font-bold text-white ${cairo100.className}`}>التواصل</p>
                <ActionButton href="/admin/contact/create" label="إضافة رسالة جديدة" />
            </div>

            <div className="mt-6 overflow-x-auto">
                {loading ? (
                    <Loading />
                ) : (
                    <div className="w-full overflow-x-auto">
                        <table className="w-full border-collapse bg-[#10274d] shadow-lg rounded-lg overflow-hidden min-w-[800px]">
                            <thead className="bg-[#1E3A8A] text-black text-sm">
                                <tr>
                                    <th className={`px-6 py-4 text-center border-b min-w-[150px] ${cairo200.className}`}>الاسم الكامل</th>
                                    <th className={`px-6 py-4 text-center border-b min-w-[150px] ${cairo200.className}`}>رقم الهاتف</th>
                                    <th className={`px-6 py-4 text-center border-b min-w-[200px] ${cairo200.className}`}>مكان الاقامة</th>
                                    <th className={`px-6 py-4 text-center border-b min-w-[250px] ${cairo200.className}`}>الرسالة</th>
                                    <th className={`px-6 py-4 text-center border-b min-w-[150px] ${cairo200.className}`}>التاريخ</th>
                                    <th className={`px-6 py-4 text-center border-b min-w-[150px] ${cairo200.className}`}>العمليات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contactData.map((row, index) => (
                                    <tr
                                        key={row._id}
                                        className={`border-b transition duration-300 ${index % 2 === 0 ? "bg-[#163266]" : "bg-[#1A3D6F]"
                                            } hover:bg-[#1E4B8A]`}
                                    >
                                        <td className={`px-6 py-4 text-sm text-center text-white whitespace-nowrap ${cairo100.className}`}>{row.name}</td>
                                        <td className={`px-6 py-4 text-sm text-center text-white whitespace-nowrap ${cairo100.className}`}>{row.phone}</td>
                                        <td className={`px-6 py-4 text-sm text-center text-white whitespace-nowrap ${cairo100.className}`}>{row.address}</td>
                                        <td className={`px-6 py-4 text-sm text-center text-white ${cairo100.className}`}>{row.message}</td>
                                        <td className={`px-6 py-4 text-sm text-center text-white whitespace-nowrap ${cairo100.className}`}>
                                            {new Date(row.date).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-center flex justify-center gap-2">
                                            <button onClick={() => openEditModal(row)}
                                                className="text-white hover:bg-blue-700 rounded-full  px-2 py-2 "
                                            >
                                                <CiEdit />
                                            </button>
                                            <button onClick={() => openDeleteModal(row._id)}
                                                className="text-white hover:bg-red-700  rounded-full  px-2 py-2"
                                            >
                                                <MdDeleteOutline />
                                            </button>
                                            <button onClick={() => sendWhatsAppMessage(row.phone)}
                                                className="text-white hover:bg-green-700 rounded-full px-2 py-2"
                                            >
                                               <FaWhatsapp/>
                                            </button>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                )}
            </div>

            <EditContactModel
                isOpen={isEditModalOpen}
                closeModal={closeEditModal}
                contactData={contactToEdit}
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

export default ContactPage;
