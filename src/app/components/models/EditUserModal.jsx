import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import LableForm from '@/app/components/Forms/LableForm';
import InputFiled from '@/app/components/Forms/InputFiled';
import Button from '@/app/components/Forms/Button';

function EditUserModal({ isOpen, closeModal, userData, onEdit }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (userData) {
      reset({
        name: userData.name || '',
        email: userData.email || '',
        password: '', // إضافة حقل كلمة السر
      });
    }
  }, [userData, reset]);

  const onSubmit = async (data) => {
    try {
      await onEdit(data); // استدعاء دالة التحديث
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  if (!isOpen || !userData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#041126] rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-center mb-4">تعديل المستخدم</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <LableForm lable="الاسم الكامل" />
          <InputFiled
            register={register}
            type="text"
            name="name"
            placeholder="أدخل الاسم الكامل"
            validation={{ required: 'يرجى إدخال الاسم' }}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

          <LableForm lable="البريد الإلكتروني" />
          <InputFiled
            register={register}
            type="email"
            name="email"
            placeholder="أدخل البريد الإلكتروني"
            validation={{ required: 'يرجى إدخال البريد الإلكتروني' }}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          <LableForm lable="كلمة المرور" />
          <InputFiled
            register={register}
            type="password"
            name="password"
            placeholder="أدخل كلمة المرور (اختياري)"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-100 text-black  px-4  py-1  rounded-lg hover:bg-gray-500"
            >
              إلغاء
            </button>
            <Button text="تحديث" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUserModal;
