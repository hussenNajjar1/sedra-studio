'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import { cairo100, cairo200 } from '../../../../fonts';
const Offers = () => {
    const [Offers, setOffers] = useState([]);
    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const res = await fetch('/api/offers', { cache: 'no-store' });
                if (!res.ok) {
                    throw new Error('فشل في جلب قائمة الاتصالات');
                }
                const data = await res.json();
                setOffers(data.Offerss);
            } catch (error) {
                console.error('خطأ في جلب قائمة الاتصالات:', error);
            }
        };
        fetchContacts();
    }, []);

    return (
        <div className='container mx-auto ' id='Offers'>
            <h1 className={`  text-center color-title   text-3xl  py-20 ${cairo200.className}`} id='HHH'> العروض</h1>
            <div className='flex justify-center flex-wrap items-center'>
                {
                    Offers.map((item) => (
                        <div key={item._id} className='item m-3 w-[400px] h-[350px] bg-article  flex justify-between   rounded-[15px]  flex-col'>
                            <div className="text  font-cairo font-semibold  ">
                                <h1 className={`text-center text-2xl pt-5 text-article ${cairo200.className}`}>  {item.title}</h1>
                                <p className={`text-right text-xl px-4 py-2 pt-5 ${cairo100.className}`}>   {item.description}</p>
                                <h1 className={` text-right px-4 py-2 text-article ${cairo200.className}`}> {item.price} $ <span className={`text-2xl  text-sky-500 ${cairo200.className}`}> : السعر </span> </h1>
                            </div>
                            <div className='footer-article text-center py-1 rounded-b-[15px] hover:bg-fuchsia-900'>
                                <Link href={'#contact'} className={`text-xl  text-blue-400 ${cairo100.className}`}> احجز الان</Link>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Offers
