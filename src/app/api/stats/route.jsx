import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/ConnectMongoDb";
import ArticleModels from "../../../../models/ArticleModels";
import ContactModel from "../../../../models/ContactModels";
import OffersModel from "../../../../models/OffersModels";
import User from "../../../../models/User";
import VisitorModel from "../../../../models/Visitor";// ✅ إضافة مودل الزوار

export async function GET() {
    try {
        await connectMongoDB();
        const [articleCount, contactCount, offersCount, userCount, visitorCount] = await Promise.all([
            ArticleModels.countDocuments(),
            ContactModel.countDocuments(),
            OffersModel.countDocuments(),
            User.countDocuments(),
            VisitorModel.countDocuments(), // ✅ جلب عدد الزوار
        ]);

        return NextResponse.json(
            { Data: { articleCount, contactCount, offersCount, userCount, visitorCount } },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching stats:", error);
        return NextResponse.json({ message: "Error Fetching Data" }, { status: 500 });
    }
}
