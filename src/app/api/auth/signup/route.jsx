import bcrypt from "bcryptjs";
import connectMongoDB from "../../../../../libs/ConnectMongoDb";
import User from "../../../../../models/User";
import { NextResponse } from "next/server"; // استيراد NextResponse

export async function POST(req) {
  const { name, email, password } = await req.json();

  if (!email || !password || !name) {
    return new NextResponse(
      JSON.stringify({ message: "جميع الحقول مطلوبة" }),
      { status: 400 }
    );
  }

  await connectMongoDB();

  // تحقق إذا كان البريد الإلكتروني موجود بالفعل
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new NextResponse(
      JSON.stringify({ message: "البريد الإلكتروني مستخدم بالفعل" }),
      { status: 400 }
    );
  }

  // إنشاء كلمة مرور مشفرة
  const hashedPassword = await bcrypt.hash(password, 10);

  // إضافة المستخدم الجديد إلى قاعدة البيانات
  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();

  // إرسال رد بنجاح العملية
  return new NextResponse(
    JSON.stringify({ message: "تم إنشاء الحساب بنجاح" }),
    { status: 201 }
  );
}
