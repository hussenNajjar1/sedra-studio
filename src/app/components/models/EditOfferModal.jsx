import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import LableForm from '@/app/components/Forms/LableForm';
import InputFiled from '@/app/components/Forms/InputFiled';
import Button from '@/app/components/Forms/Button';

function EditOfferModal({ isOpen, closeModal, offerData, onEdit }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (offerData) {
      reset({
        title: offerData.title || '',
        description: offerData.description || '',
        price: offerData.price || '',
      });
    }
  }, [offerData, reset]);

  const onSubmit = async (data) => {
    try {
      await onEdit(data); // استدعاء دالة التحديث
    } catch (error) {
      console.error('Error updating offer:', error);
    }
  };

  if (!isOpen || !offerData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#041126] rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-center mb-4">تعديل العرض</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <LableForm lable="عنوان العرض" />
          <InputFiled
            register={register}
            type="text"
            name="title"
            placeholder="أدخل عنوان العرض"
            validation={{ required: 'يرجى إدخال عنوان العرض' }}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}

          <LableForm lable="وصف العرض" />
          <InputFiled
            register={register}
            type="text"
            name="description"
            placeholder="أدخل وصف العرض"
            validation={{ required: 'يرجى إدخال وصف العرض' }}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}

          <LableForm lable="السعر" />
          <InputFiled
            register={register}
            type="text"
            name="price"
            placeholder="أدخل السعر"
            validation={{ required: 'يرجى إدخال السعر' }}
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}

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

export default EditOfferModal;
