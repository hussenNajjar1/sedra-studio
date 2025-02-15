import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/ConnectMongoDb";
import User from "../../../../models/User";


export async function GET() {
    try {
        await connectMongoDB();
        const Users = await User.find();
        return NextResponse.json({ Users }, { status: 200 })
    }
    catch (error) {
        return NextResponse.json({ message: "Error Fetching Data" }, { status: 500 })
    }

}