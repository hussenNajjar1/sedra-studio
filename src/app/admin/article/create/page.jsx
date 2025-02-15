'use client';

import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cairo100, cairo200 } from '../../../../../fonts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from '@/head';


const ArticlePage = () => {
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'next_cloudinary_app');

        const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`, {
            method: 'POST',
            body: formData,
        });

        const data = await res.json();
        const article = {
            description,
            imageUrl: data.secure_url,
        };

        await fetch('/api/article', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(article),
        });
        toast.success('تم الاضافة بنجاح ')
        setTimeout(() => {
            router.back();
        }, 2000);
    };

    return (
        <div className="container mx-auto p-4">
            <Head title="المقالات -اضافة مقال"/>
            <h1 className={`  mb-4 text-right ${cairo100.className}`}>اضافة مقالة جديدة    </h1>
            <form onSubmit={handleSubmit} className="space-y-4 text-right text-black ">
                <div>
                    <label className={`block  text-white ${cairo100.className}`}>الوصف</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={`mt-1 block w-full border text-right  border-gray-300 rounded-md shadow-sm ${cairo100.className}`}
                        required
                    />
                </div>
                <div>
                    <label className={`block  text-white ${cairo100.className}`}>تحميل الصورة</label>
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="mt-1 block w-full border border-gray-300 text-white text-right rounded-md shadow-sm"
                        required
                    />
                </div>
                <button type="submit" className={`px-4 w-full py-2 bg-blue-600 text-white rounded-md ${cairo100.className}`}>اضافة </button>
            </form>
            <ToastContainer />
        </div>
    )
}

export default ArticlePage