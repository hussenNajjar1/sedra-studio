"use client";

import React from "react";
import { BiHomeAlt, BiUser, BiNews } from "react-icons/bi";
import { BsClipboardData, BsChatSquareText, BsGift } from "react-icons/bs";
import Link from "next/link";

const navItems = [
  { href: "#home", icon: <BiHomeAlt />, label: "الصفحة الرئيسية" },
  { href: "#about", icon: <BiUser />, label: "من نحن" },
  { href: "#services", icon: <BsClipboardData />, label: "الخدمات" },
  { href: "#Article", icon: <BiNews />, label: "المقالات" },
  { href: "#Offers", icon: <BsGift />, label: "العروض" },
  { href: "#contact", icon: <BsChatSquareText />, label: "اتصل بنا" },
];

const Navbarmobile = () => {
  return (
    <nav className="fixed bottom-2 lg:bottom-8 w-full z-50">
      <div className="container mx-auto">
        <div className="w-full bg-black/20 h-[96px] backdrop-blur-2xl rounded-full max-w-[460px] mx-auto px-5 flex justify-between text-2xl text-white/50">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="cursor-pointer w-[60px] flex items-center justify-center"
              aria-label={`الانتقال إلى ${item.label}`}
            >
              {item.icon}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbarmobile;
