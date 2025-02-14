"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { FiHome, FiUsers, FiSettings, FiFileText, FiTag, FiMail, FiMenu, FiLogOut } from 'react-icons/fi';
import { signOut } from 'next-auth/react'; 
import { FiCamera } from 'react-icons/fi';
import { cairo100 } from '../../../fonts';
function Sidebar() {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded); 
    };

    const handleLogout = async () => {
        await signOut({ callbackUrl: '/' }); 
    };

    return (
        <div className={`h-screen ${isExpanded ? 'w-64' : 'w-16'} bg-[#0A1931]  fixed sm:relative   text-white shadow-md transition-all duration-300 ${isExpanded ? 'z-50' : ''} sm:z-auto`}>
            {/* زر التوسيع */}
            <div className="p-4 flex justify-between items-center border-b border-gray-600 sm:z-auto">
                <button
                    onClick={toggleSidebar}
                    className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-200 shadow-md"
                >
                    <FiMenu className="w-5 h-5 text-white" />
                </button>
                {isExpanded && <Link href={'/admin'} className={`text-lg font-bold ${cairo100.className}`}>لوحة التحكم</Link>}
            </div>

            {/* الروابط */}
            <div className={`flex flex-col mt-4 space-y-2 px-4 ${isExpanded ? 'z-50' : ''} fixed sm:relative  sm:z-auto`}>
                <Link
                    href="/"
                    className={`flex items-center gap-2 p-2 rounded-lg hover:bg-[#3B82F6] transition duration-200 text-sm `}
                >
                    <FiHome className="w-5 h-5" />
                    {isExpanded && <span  className={`${cairo100.className}`}>الصفحة الرئيسية</span>}
                </Link>
                <Link
                    href="/admin/users"
                    className={`flex items-center gap-2 p-2 rounded-lg hover:bg-[#3B82F6] transition duration-200 text-sm `}
                >
                    <FiUsers className="w-5 h-5" />
                    {isExpanded && <span className={`${cairo100.className}`} >المستخدمون</span>}
                </Link>
             
                <Link
                    href="/admin/article"
                    className={`flex items-center gap-2 p-2 rounded-lg hover:bg-[#3B82F6] transition duration-200 text-sm `}
                >
                    <FiCamera className="w-5 h-5" />
                    {isExpanded && <span className={`${cairo100.className}`} >المقالات</span>}
                </Link>
                <Link
                    href="/admin/offers"
                    className={`flex items-center gap-2 p-2 rounded-lg hover:bg-[#3B82F6] transition duration-200 text-sm `}
                >
                    <FiTag className="w-5 h-5" />
                    {isExpanded && <span className={`${cairo100.className}`} >العروض</span>}
                </Link>
                <Link
                    href="/admin/contact"
                    className={`flex items-center gap-2 p-2 rounded-lg hover:bg-[#3B82F6] transition duration-200 text-sm `}
                >
                    <FiMail className="w-5 h-5" />
                    {isExpanded && <span className={`${cairo100.className}`} >فورمات التواصل</span>}
                </Link>

                {/* زر تسجيل الخروج */}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-red-500 transition duration-200 text-sm mt-4"
                >
                    <FiLogOut className="w-5 h-5" />
                    {isExpanded && <span className={`${cairo100.className}`} >تسجيل الخروج</span>}
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
