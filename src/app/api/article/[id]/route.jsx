import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../libs/ConnectMongoDb";
import Article from "../../../../../models/ArticleModels";
import { v2 as cloudinary } from "cloudinary";
export const DELETE = async (request, { params }) => {
  try {
    await connectMongoDB();
    const { id } = params; // تأكد من أن الاسم متوافق مع الملف [id].js
    const deletedArticle = await Article.findByIdAndDelete(id);

    if (!deletedArticle) {
      return NextResponse.json({ message: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting article' }, { status: 500 });
  }
};


export async function PUT(request, { params }) {
  try {
    await connectMongoDB();
    const { id } = params;

    if (!id) return NextResponse.json({ message: 'معرف المقالة مطلوب' }, { status: 400 });

    const body = await request.json();
    console.log("بيانات الطلب:", body);

    const { description, imageUrl } = body;

    if (!imageUrl) return NextResponse.json({ error: "الصورة مطلوبة" }, { status: 400 });

    const updatedArticle = await Article.findByIdAndUpdate(
      id,
      { description, imageUrl },
      { new: true }
    );

    if (!updatedArticle) return NextResponse.json({ message: 'المقالة غير موجودة' }, { status: 404 });

    return NextResponse.json(updatedArticle, { status: 200 });

  } catch (error) {
    console.error('خطأ أثناء تحديث المقالة:', error);
    return NextResponse.json({ message: 'حدث خطأ أثناء التحديث' }, { status: 500 });
  }
}
