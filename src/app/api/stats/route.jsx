import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/ConnectMongoDb";
import ArticleModel from "../../../../models/ArticleModels";
import ContactModel from "../../../../models/ContactModels";
import OffersModel from "../../../../models/OffersModels";
import User from "../../../../models/User";
import Visitor from "../../../../models/Visitor";


export const dynamic = "force-dynamic"; 

export async function GET() {
    try {
        await connectMongoDB();

        const [articleCount, contactCount, offersCount, userCount, visitorCount] = await Promise.all([
            ArticleModel.countDocuments(),
            ContactModel.countDocuments(),
            OffersModel.countDocuments(),
            User.countDocuments(),
            Visitor.countDocuments()
        ]);

        return new NextResponse(
            JSON.stringify({ data: { articleCount, contactCount, offersCount, userCount, visitorCount } }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
                    "Pragma": "no-cache",
                    "Expires": "0",
                },
            }
        );
    } catch (error) {
        console.error("Error fetching stats:", error);
        return NextResponse.json({ message: "Error Fetching Data" }, { status: 500 });
    }
}
