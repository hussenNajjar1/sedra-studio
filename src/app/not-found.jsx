import Link from 'next/link'
import Image from 'next/image'
import { cairo200 ,cairo100 } from '../../fonts'
export default function NotFound() {
    return (
        <div className='flex justify-center items-center flex-col text-center'>
            <Image 
                src={'/images/svg/404 Error Page not Found with people connecting a plug-pana.svg'} 
                alt='صفحة غير موجودة' 
                width={900} 
                height={900} 
            />
            <h2 className={`${cairo200.className} font-cairo font-semibold`}>الصفحة غير موجودة</h2>
            <p className={` ${cairo100.className} font-cairo font-semibold`}>عذرًا، لم نتمكن من العثور على الصفحة المطلوبة</p>
            <Link 
                href="/" 
                className={`py-2 px-9 my-5 font-cairo font-semibold bg-sky-800 text-white rounded-lg ${cairo100.className}`}
            >
                العودة إلى الصفحة الرئيسية
            </Link>
        </div>
    )
}
