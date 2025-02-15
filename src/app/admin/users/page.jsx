'use client'
import React, { useEffect, useState } from 'react';
import Breadcrumb from '@/app/components/Breadcrumbs/Breadcrumb';
import ActionButton from '@/app/components/Forms/ActionButton';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import FetchData from '../../../../Servers/FetchData';
import DeleteModal from '@/app/components/DeleteModal';
import EditUserModal from '@/app/components/models/EditUserModal';
import { ToastContainer, toast } from 'react-toastify';
import { cairo100, cairo200 } from '../../../../fonts';
import Head from '@/head';
import Loading from '@/app/components/Loading';

function UsersPage() {
    const [userData, setUsertData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [sectionIdToDelete, setSectionIdToDelete] = useState(null);
    const [userToEdit, setUserToEdit] = useState(null);


    useEffect(() => {
        const fetchContacts = async () => {
            setLoading(true);
            const data = await FetchData('user', 'Users');
            if (data) {
                setUsertData(data);
            }
            setLoading(false);
        };

        fetchContacts();
    }, []);

    const openEditModal = (offer) => {
        if (offer) {
            setUserToEdit(offer);
            setIsEditModalOpen(true);
        }
    };

    const closeEditModal = () => {
        setUserToEdit(null);
        setIsEditModalOpen(false);
    };

    const handleEdit = async (updatedUser) => {
        try {
            const res = await fetch(`/api/user/${userToEdit._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser),
            });
            if (!res.ok) {
                throw new Error('Failed to update');
            }
            const updatedData = await res.json();
            setUsertData((prevData) =>
                prevData.map((item) => (item._id === userToEdit._id ? updatedData : item))
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
        if (!sectionIdToDelete) {
            toast.error('لم يتم تحديد مستخدم للحذف');
            return;
        }
    
        try {
            const res = await fetch(`/api/user/${sectionIdToDelete}`, {
                method: "DELETE",
            });
    
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Failed to delete');
            }
    
            setUsertData((prevData) => prevData.filter((item) => item._id !== sectionIdToDelete));
            toast.success('تم الحذف بنجاح');
        } catch (error) {
            toast.error(error.message || 'حدث خطأ أثناء الحذف');
        } finally {
            closeDeleteModal();
        }
    };
    
    return (
        <div className="px-4 py-6 bg-[#0A1931] min-h-screen">
            <Head title={'لوحة التحكم -  المستخدمين'} />
            <Breadcrumb lable=" المستخدمين" />
            <div className="flex flex-row md:flex-row justify-between items-center py-6 gap-4">
                <p className={`text-xl md:text-2xl  font-bold text-white ${cairo100.className}`}>المستخدمين </p>
                <ActionButton href="/admin/users/create" label="إضافة مستخدم  جديد" />
            </div>
            <div className="mt-6 overflow-x-auto bg-[#111a30] rounded-lg shadow-md" dir="rtl">
                {loading ? (
                    <Loading/>
                ) : (
                    <table className="table-auto w-full min-w-[600px] ">
                        <thead className="bg-[#0A1931] border-b-2 ">
                            <tr>
                                <th className={`px-4 py-3 text-sm text-black font-semibold text-center ${cairo200.className}`}> الاسم الكامل</th>
                                <th className={`px-4 py-3 text-sm text-black font-semibold text-center ${cairo200.className}`}> البريد الالكنروني</th>
                                <th className={`px-4 py-3 text-sm text-black font-semibold text-center ${cairo200.className}`}>العمليات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {userData.map((user) => (
                                <tr key={user._id} className="bg-[#163266]  hover:bg-[#14284b]">
                                    <td className={`px-4 py-3 text-sm text-white whitespace-nowrap text-center  ${cairo100.className}`}>{user.name}</td>
                                    <td className={`px-4 py-3 text-sm text-white whitespace-nowrap text-center  ${cairo100.className}`}>{user.email}</td>
                                    <td className="px-2 lg:px-6 py-4 whitespace-nowrap text-center  flex justify-center gap-2 border-0 ">
                                        <button
                                            className="text-white hover:bg-blue-700 rounded-full  px-2 py-2 "
                                            onClick={() => openEditModal(user)}
                                        >
                                            <CiEdit className="text-lg" />

                                        </button>
                                        <button
                                            className="text-white hover:bg-red-700  rounded-full  px-2 py-2"
                                            onClick={() => openDeleteModal(user._id)}
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
            <EditUserModal
                isOpen={isEditModalOpen}
                closeModal={closeEditModal}
                userData={userToEdit}
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

export default UsersPage;
