// Header.js
import React from 'react';
import { FiCamera } from 'react-icons/fi';
import Link from 'next/link';
import { authOptions } from '../../../../libs/nextAuth';
import { getServerSession } from "next-auth/next";
import { cairo100 } from '../../../../fonts';
async function Header() {
  const session = await getServerSession(authOptions);
  return (
    <header className="w-full shadow-md">
      <nav className="container mx-auto flex items-center justify-between  flex-row-reverse py-4 px-6">
        <div className="flex items-center space-x-2">
          <h1 className={`text-xl font-bold text-white ${cairo100.className}`}>استديو سدرة</h1>
          <FiCamera size={28} className="text-[#FF56F6]" />
        </div>
        <div className="flex space-x-4">
       
          {session ? (
            <Link href="/admin" className={`btn lg:px-4 lg:py-2 px-3 ${cairo100.className}`}>
              لوحة التحكم
            </Link>
          ) : (
            <Link href="/login" className={`btn lg:px-4 lg:py-2 px-3 ${cairo100.className}`}>
              تسجيل الدخول
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
