import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import LableForm from '@/app/components/Forms/LableForm';
import InputFiled from '@/app/components/Forms/InputFiled';
import Button from '@/app/components/Forms/Button';
import { cairo200 } from '../../../../fonts';
function EditContactModel({ isOpen, closeModal, contactData, onEdit }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (contactData) {
            reset({
                name: contactData.name || '',
                phone: contactData.phone || '',
                address: contactData.address || '',
                message: contactData.message || '',
            });
        }
    }, [contactData, reset]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-[#041126] p-6 rounded-lg w-full max-w-md shadow-lg">
                <h2 className={`text-xl font-semibold text-center text-white mb-4 ${cairo200.className}`}>تعديل الرسالة</h2>
                <form onSubmit={handleSubmit(onEdit)} className="space-y-4 text-white">
                    <div>
                        <LableForm lable="الاسم الكامل" />
                        <InputFiled register={register} name="name" />
                    </div>

                    <div>
                        <LableForm lable="رقم الهاتف" />
                        <InputFiled register={register} name="phone" />
                    </div>

                    <div>
                        <LableForm lable="مكان الإقامة" />
                        <InputFiled register={register} name="address" />
                    </div>

                    <div>
                        <LableForm lable="الرسالة" />
                        <InputFiled register={register} name="message" />
                    </div>

                    <div className="flex justify-between  items-center mt-4">
                        <Button text="تحديث" />
                        <button
                            type="button"
                            onClick={closeModal}
                            className="bg-gray-700 text-white px-4  mt-6  mr-2 py-2 rounded-lg hover:bg-gray-500 transition"
                        >
                            إلغاء
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditContactModel;
