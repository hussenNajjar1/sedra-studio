import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/ConnectMongoDb";
import Visitor from "../../../../models/Visitor";

export async function GET() {
    try {
        await connectMongoDB(); // الاتصال بقاعدة البيانات

        let visitor = await Visitor.findOne(); // البحث عن عدد الزوار الحالي
        if (!visitor) {
            visitor = new Visitor({ count: 1 }); // إذا لم يكن موجودًا، يتم تعيين العدد إلى 1
        } else {
            visitor.count += 1; // زيادة العدد بمقدار 1
        }

        await visitor.save(); // حفظ التحديث في قاعدة البيانات

        return NextResponse.json({ success: true, count: visitor.count });
    } catch (error) {
        console.error("❌ Error updating visitor count:", error);
        return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
    }
}
