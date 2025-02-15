import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/ConnectMongoDb";
import ArticleModels from "../../../../models/ArticleModels";
import { v2 as cloudinary } from "cloudinary";

export const GET = async () => {
  try {
      await connectMongoDB();
      const articles = await ArticleModels.find();
      return NextResponse.json({ articles }, { status: 200 })
  }
  catch (error) {
      return NextResponse.json({ message: 'Error Fetching Contacts Data' }, { status: 500 })
  }

}

// إعدادات Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    // الاتصال بقاعدة البيانات
    await connectMongoDB();
    console.log("✅ اتصال بقاعدة البيانات ناجح");

    // استخراج البيانات من الـ request
    const { description, imageUrl } = await request.json();
    console.log("📩 البيانات المستلمة:", { description, imageUrl });

    // تحقق من وجود imageUrl
    if (!imageUrl) {
      return NextResponse.json({ error: "رابط الصورة مطلوب" }, { status: 400 });
    }

    // إنشاء مقال جديد وحفظه في قاعدة البيانات
    const newArticle = new ArticleModels({
      description,
      imageUrl, // الرابط المرسل من الـ Frontend
    });

    await newArticle.save();
    console.log("✅ المقالة تم حفظها بنجاح:", newArticle);

    // إرجاع استجابة مع المقالة التي تم حفظها
    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    // التعامل مع الأخطاء
    console.error("❌ خطأ أثناء تنفيذ العملية:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
