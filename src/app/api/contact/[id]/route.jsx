import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../libs/ConnectMongoDb";
import Contact from "../../../../../models/ContactModels";
export const DELETE = async (request, { params }) => {
    try {
        await connectMongoDB();
        const { id } = params;
        await Contact.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error deleting Contact' }, { status: 500 });
    }
};




export const PUT = async (request, { params }) => {
    try {
        await connectMongoDB();
        const { id } = params;
        const updatedData = await request.json();
        
        const updatedContact = await Contact.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedContact) {
            return NextResponse.json({ message: "Contact not found" }, { status: 404 });
        }

        return NextResponse.json(updatedContact, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error updating Contact" }, { status: 500 });
    }
};