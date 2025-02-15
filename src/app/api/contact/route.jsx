import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/ConnectMongoDb";
import Contact from "../../../../models/ContactModels";
export const GET = async () => {
    try {
        await connectMongoDB();
        const Contacts = await Contact.find();
        return NextResponse.json({ Contacts }, { status: 200 })
    }
    catch (error) {
        return NextResponse.json({ message: 'Error Fetching Contacts Data' }, { status: 500 })
    }

}

export const POST = async (request) => {
    try {
      await connectMongoDB();
      const { name, phone, address, message } = await request.json();
  
      if (!name || !phone || !address || !message) {
        return NextResponse.json(
          { message: 'جميع الحقول مطلوبة' },
          { status: 400 }
        );
      }
  
      const NewContact = await Contact.create({ name, phone, address, message });
      return NextResponse.json(
        { message: 'تم إرسال الرسالة بنجاح', NewContact },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: 'حدث خطأ أثناء الإرسال', error: error.message },
        { status: 500 }
      );
    }
  };