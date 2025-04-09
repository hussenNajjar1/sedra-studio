
import React from 'react'
import Link from 'next/link'
import { cairo200,cairo100 } from '../../../fonts';
import { AiOutlineInstagram } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa";

const Footer = () => {
    return (
        <div className=''>

            <footer className="footer footer-center    flex flex-col items-center space-y-8 justify-center p-10 bg-base-200 text-base-content rounded   bg-sky-800">
                <h1 className={`${cairo200.className} text-center `}> نحن هنا لخدمتكم على مدار 24 ساعة يومياً. لا تترددوا في التواصل معنا لأي استفسار أو مساعدة، ففريقنا دائماً جاهز لدعمكم!</h1>

                <nav className="grid grid-flow-col gap-4">
                    <div className='flex  space-x-3'>
                        <Link href={'http://www.facebook.com/profile.php?id=100085597227744&mibextid=ZbWKwL'} className={`link link-hover ${cairo100.className}`}   aria-label={'انتقال الى فيسبوك'} >  فيسبوك </Link>
                        <Link href={'http://www.facebook.com/profile.php?id=100085597227744&mibextid=ZbWKwL'} aria-label={'انتقال الى فيسبوك'} ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></Link>
                    </div>
                    <div className='flex  space-x-3'>
                        <Link href={`https://wa.me/963941917420`} className={`link link-hover ${cairo100.className}` } aria-label={'انتقال الى واتساب'}  > واتساب  </Link>
                        <Link href={`https://wa.me/963941917420`} aria-label={'انتقال الى واتساب'} ><FaWhatsapp /></Link>
                    </div>
                    <div className='flex  space-x-3'>
                        <Link href={'https://www.instagram.com/sedra_photography2002?igsh=MTlna3IxYTE0Y2g1Zw=='}  aria-label={'انتقال الى إنستغرام'}  className={`link link-hover ${cairo100.className}`}> إنستغرام  </Link>
                        <Link href={'https://www.instagram.com/sedra_photography2002?igsh=MTlna3IxYTE0Y2g1Zw=='}  aria-label={'انتقال الى إنستغرام'} ><AiOutlineInstagram /></Link>
                    </div>
                </nav>
                <aside className='pt-5 text-center'>
                    <p>Copyright © 2024 -Hussen Najjar</p>
                </aside>
            </footer>
        </div>
    )
}

export default Footer










