import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../libs/ConnectMongoDb";
import Offers from "../../../../../models/OffersModels";
export const DELETE = async (request, { params }) => {
    try {
        await connectMongoDB();
        const { id } = params;
        await Offers.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error deleting Offers' }, { status: 500 });
    }
};

export const PUT = async (request, { params }) => {
    try {
        await connectMongoDB();
        const { id } = params;
        const updatedData = await request.json();
        
        const updatedOffer = await Offers.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedOffer) {
            return NextResponse.json({ message: "Offer not found" }, { status: 404 });
        }

        return NextResponse.json(updatedOffer, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error updating offer" }, { status: 500 });
    }
};