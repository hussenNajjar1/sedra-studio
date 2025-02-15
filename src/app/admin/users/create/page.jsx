'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import LableForm from '@/app/components/Forms/LableForm';
import InputFiled from '@/app/components/Forms/InputFiled';
import Lable from '@/app/components/Lable';
import Breadcrumb from '@/app/components/Breadcrumbs/Breadcrumb';
import Button from '@/app/components/Forms/Button';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from '@/head';

function CreatePage() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const router = useRouter();

    const onSubmit = async (data) => {
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const result = await res.json();

        if (res.ok) {
            toast.success("تم إنشاء الحساب بنجاح!");
            reset();
            router.back();
        } else {
            toast.error(result.message || "فشل في التسجيل. حاول مرة أخرى.");
        }
    };
    return (
        <div>
            <Head title={'المستخدمين -  اضافة مستخدم جديد'} />
            <div>
                <Breadcrumb lable=" المستخدمين" />
                <Lable lable="إضافة مستخدم جديدة" />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <LableForm lable="الاسم" />
                    <InputFiled
                        register={register}
                        type="text"
                        name="name"
                        placeholder="أدخل الاسم "
                        validation={{ required: "الاسم مطلوب" }}
                    />
                    {errors.name && <p className="pr-4 text-red-500">{errors.name.message}</p>}

                    <LableForm lable=" البريد الإلكتروني" />
                    <InputFiled
                        register={register}
                        type="email"
                        name="email"
                        placeholder="أدخل البريد الإلكتروني"
                        validation={{ required: 'يرجى إدخال البريد الإلكتروني' }}
                    />
                    {errors.email && <p className="pr-4 text-red-500">{errors.email.message}</p>}

                    <LableForm lable=" كلمة المرور" />
                    <InputFiled
                        register={register}
                        type="password"
                        name="password"
                        placeholder="كلمة  المرور"
                        validation={{ required: 'يرجى إدخال كلمة المرور ' }}
                    />
                    {errors.password && <p className="pr-4 text-red-500">{errors.password.message}</p>}
                    <Button text="إرسال" />
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}

export default CreatePage;
