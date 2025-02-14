import React from 'react'
import Image from 'next/image'
import { cairo100,cairo200 } from '../../../../fonts';
const Services = () => {
  return (
    <div className='container mx-auto' id='services'>
      <h1 className={`  text-center color-title   text-3xl  py-20 ${cairo200.className}`}>الخدمات</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

        <div className="item bgService rounded-[15px] flex justify-between h-[200px] md:p-9 p-3 pt-4 mx-3 ">
          <div className="text text-right">
            <h1 className={`  ${cairo200.className} text-2xl font-bold color-title pr-3 pb-2`}> خدمات تسويق شاملة</h1>
            <p className={`${cairo100.className}  text-xl`}>  خدمات تسويق شاملة لضمان وصول أفضل لأعمالك ومنتجاتك عبر الإنترنت ومنصات التواصل الاجتماعي</p>
          </div>
          <div className="image pl-3 pt-7 md:pt-0">
            <Image src={'/images/png/img3.png'} alt='image' width={200} height={200} />
          </div>
        </div>
        <div className="item bgService rounded-[15px] flex justify-between h-[200px] md:p-9 p-3 pt-4 mx-3 ">
          <div className="text text-right">
            <h1 className={`  ${cairo200.className} text-2xl font-bold color-title pr-3 pb-2`}>التصميم والطباعة</h1>
            <p className={`${cairo100.className}  text-xl'`}>تصميم كروت الأعراس والدعوات والمطبوعات الشخصية بأفضل التصاميم وأعلى جودة</p>
          </div>
          <div className="image pl-3 pt-7 md:pt-0">
            <Image src={'/images/png/img4.png'} alt='image' width={200} height={200} />
          </div>
        </div>
        <div className="item bgService rounded-[15px] flex justify-between h-[200px] md:p-9 p-3 pt-4 mx-3 ">
          <div className="text text-right">
            <h1 className={`  ${cairo200.className} text-2xl font-bold color-title pr-3 pb-2`}> تصوير الأعراس</h1>
            <p className={`${cairo100.className}  text-xl'`}> نقدم خدمات تصوير احترافية لأجمل لحظات زفافك، من تحضيرات العروسين حتى لحظات الرقص الأولى</p>
          </div>
          <div className="image pl-3 pt-7 md:pt-0">
            <Image src={'/images/png/img5.png'} alt='image' width={200} height={200} />
          </div>
        </div>
        <div className="item bgService rounded-[15px] flex justify-between h-[200px] md:p-9 p-3 pt-4 mx-3 ">
          <div className="text text-right">
            <h1 className={`  ${cairo200.className} text-2xl font-bold color-title pr-3 pb-2`}> تصوير الشخصي</h1>
            <p className={`${cairo100.className}  text-xl'`}> جلسات تصوير شخصية عالية الجودة، تناسب جميع المناسبات من بورتريهات عائلية إلى صور فردية</p>
          </div>
          <div className="image pl-3 pt-7 md:pt-0">
            <Image src={'/images/png/img5.png'} alt='image' width={200} height={200} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services
