import React from 'react';
import { MdWarning } from 'react-icons/md';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { cairo200,cairo100 } from '../../../fonts';
function DeleteModal({ isModalOpen, closeModal, handleDelete }) {
    if (!isModalOpen) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50"
            onClick={closeModal}
        >
            <div
                className="bg-[#041126] p-6 rounded-lg shadow-lg w-96"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center mb-4">
                    <MdWarning className="text-red-500 text-3xl" />
                    <h2 className={`text-xl font-semibold ml-3 text-white  ${cairo200.className}`}>هل أنت متأكد من الحذف؟</h2>
                </div>
                <p className={`text-white mb-6 text-sm ${cairo100.className}`}>
                    هذا الإجراء لا يمكن التراجع عنه. سيتم حذف البيانات بشكل دائم.
                </p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={closeModal}
                        className="flex items-center  mx-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                        <AiOutlineClose className="mr-2 text-base" />
                        إلغاء
                    </button>
                    <button
                        onClick={handleDelete}
                        className="flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                    >
                        <AiOutlineCheck className="mr-2 text-base" />
                        تأكيد
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;
