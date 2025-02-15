"use client";
import React from 'react';
import Image from 'next/image';
const ErrorBoundary = ({ error, reset }) => {
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='text-center'>
                <Image src={'/images/svg/Computer troubleshooting-pana.svg'} width={100} height={100} alt='error 404' />
                <h1>{error.message}</h1>
             <button onClick={() => reset()} className='bg-slate-900 text-white text-xl rounded-xl px-5 py-2'>إعادة تحميل</button>
            </div>
        </div>
    );
};

export default ErrorBoundary;

