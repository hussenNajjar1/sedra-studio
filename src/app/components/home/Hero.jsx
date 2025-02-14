'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cairo100, cairo200 } from '../../../../fonts';
import axios from 'axios';
const Hero = () => {
    useEffect(() => {
        const updateVisitorCount = async () => {
            try {
                await axios.get("/api/visitor"); 
            } catch (error) {
                console.error("❌ خطأ في تحديث عدد الزوار:", error);
            }
        };

        updateVisitorCount();
    }, []);
    return (
        <div id='Herolink' className='container mx-auto flex flex-col md:flex-row justify-between items-center p-8' style={{ direction: 'rtl' }}>
            <div className="image md:order-2 mb-8 md:mb-0" >
                <Image src="/images/png/img5.png" alt="Image" width={250} height={250} className='w-[300px] md:w-[350px] rounded-lg mx-auto' />
            </div>
            <div className="texts text-center md:text-right md:flex-1 md:order-1">
                <h1 className={`text-[25px] lg:text-[50px] leading-none mb-12 font-cairo    font-medium text-customPurple  ${cairo200.className}`} >
                    مرحبًا بكم في استديو سدرة
                </h1>
                <div className={`text text-white lg:w-[500px] space-y-4 text-xl ${cairo100.className}`}>
                    <p className={cairo200.className}>وجهتكم المثالية لخدمات التصوير الاحترافية</p>
                    <p>نحن متخصصون في تقديم أروع اللحظات بلمسة فنية لا تُنسى</p>
                    <p>سواء كنت تبحث عن توثيق يوم زفافك، جلسة تصوير شخصية، أو حفلة عيد ميلاد مليئة بالذكريات، فإن فريقنا المحترف هنا لضمان حصولك على أفضل تجربة تصوير</p>
                </div>
                <div className="link mt-5">
                    <Link href={'#contact'} className={`btn py-3 px-6 ${cairo100.className}`}>
                        تواصل معنا
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Hero;
