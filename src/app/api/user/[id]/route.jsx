import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../libs/ConnectMongoDb";
import User from "../../../../../models/User";
import bcrypt from "bcryptjs";

export const DELETE = async (request, { params }) => {
    try {
        await connectMongoDB();
        const { id } = params; 
        if (!id) {
            return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
        }

        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json({ message: 'Error deleting user' }, { status: 500 });
    }
};export const PUT = async (request, { params }) => {
    try {
        await connectMongoDB();
        const { id } = params;
        if (!id) {
            return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
        }

        const userData = await request.json();

        if (userData.password) {
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            userData.password = hashedPassword;
        }

        const updatedUser = await User.findByIdAndUpdate(id, userData, { new: true });
        if (!updatedUser) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({ message: 'Error updating user' }, { status: 500 });
    }
};
