'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import LableForm from '@/app/components/Forms/LableForm';
import InputFiled from '@/app/components/Forms/InputFiled';
import Lable from '@/app/components/Lable';
import { CreateData } from '../../../../../Servers/apiService';
import Breadcrumb from '@/app/components/Breadcrumbs/Breadcrumb';
import TextareaField from '@/app/components/Forms/TextareaField';
import Button from '@/app/components/Forms/Button';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from '@/head';


function CreatePage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const router = useRouter();

  const onSubmit = (data) => {
    CreateData(
      '/api/contact',
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
      <Head title={'التواصل -اضافة رسالة '}/>
      <div>
        <Breadcrumb lable="فورم التواصل" />
        <Lable lable="إضافة رسالة جديدة" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <LableForm lable="الاسم الكامل" />
          <InputFiled
            register={register}
            type="text"
            name="name"
            placeholder="أدخل الاسم الكامل"
            validation={{ required: 'يرجى إدخال الاسم الكامل' }}
          />
          {errors.name && <p className="pr-4 text-red-500">{errors.name.message}</p>}

          <LableForm lable="رقم الهاتف" />
          <InputFiled
            register={register}
            type="text"
            name="phone"
            placeholder="أدخل رقم الهاتف"
            validation={{ required: 'يرجى إدخال رقم الهاتف' }}
          />
          {errors.phone && <p className="pr-4 text-red-500">{errors.phone.message}</p>}

          <LableForm lable="مكان الإقامة" />
          <InputFiled
            register={register}
            type="text"
            name="address"
            placeholder="أدخل مكان الإقامة"
            validation={{ required: 'يرجى إدخال مكان الإقامة' }}
          />
          {errors.address && <p className="pr-4 text-red-500">{errors.address.message}</p>}

          <LableForm lable="الرسالة" />
          <TextareaField
            register={register}
            name="message"
            placeholder="أدخل الرسالة"
            validation={{ required: 'يرجى إدخال الرسالة' }}
          />
          {errors.message && <p className="pr-4 text-red-500">{errors.message.message}</p>}

          <Button text="إرسال" />
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default CreatePage;
