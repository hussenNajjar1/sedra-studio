'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import LableForm from '@/app/components/Forms/LableForm';
import InputFiled from '@/app/components/Forms/InputFiled';
import Lable from '@/app/components/Lable';
import { CreateData } from '../../../../../Servers/apiService';
import Breadcrumb from '@/app/components/Breadcrumbs/Breadcrumb';
import Button from '@/app/components/Forms/Button';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from '@/head';

function CreatePage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const router = useRouter();

  const onSubmit = (data) => {
    CreateData(
      '/api/offers',
      data,
      () => {
        reset();
        setTimeout(() => router.back(), 2000);
      },
      (error) => {
        console.error('خطأ أثناء الإرسال:', error);
      }
    );
  };

  return (
    <div>
      <Head title={'العروض -  اضافة عرض جديد'} />
      <div>
        <Breadcrumb lable=" العروض" />
        <Lable lable="إضافة عرض جديدة" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <LableForm lable=" عنوان العرض" />
          <InputFiled
            register={register}
            type="text"
            name="title"
            placeholder="أدخل عنوان العرض"
            validation={{ required: 'يرجى إدخال عنوان العرض' }}
          />
          {errors.title && <p className="pr-4 text-red-500">{errors.title.message}</p>}

          <LableForm lable=" وصف العرض" />
          <InputFiled
            register={register}
            type="text"
            name="description"
            placeholder="أدخل رقم الهاتف"
            validation={{ required: 'يرجى إدخال وصف العرض' }}
          />
          {errors.description && <p className="pr-4 text-red-500">{errors.description.message}</p>}

          <LableForm lable=" السعر" />
          <InputFiled
            register={register}
            type="text"
            name="price"
            placeholder="أدخل  السعر"
            validation={{ required: 'يرجى إدخال السعر ' }}
          />
          {errors.price && <p className="pr-4 text-red-500">{errors.price.message}</p>}
          <Button text="إرسال" />
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default CreatePage;
