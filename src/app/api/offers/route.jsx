import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/ConnectMongoDb";
import Offers from "../../../../models/OffersModels";

export const GET = async () => {
    try {
        await connectMongoDB();
        const Offerss = await Offers.find();
        return NextResponse.json({ Offerss }, { status: 200 })
    }
    catch (error) {
        return NextResponse.json({ message: 'Error Fetching Offers Data' }, { status: 500 })
    }

}

export const POST = async (request) => {
    try {
      await connectMongoDB();
      const { title, description, price } = await request.json();
  
      if (!title || !description || !price ) {
        return NextResponse.json(
          { message: 'جميع الحقول مطلوبة' },
          { status: 400 }
        );
      }
  
      const NewOffers = await Offers.create({ title, description, price });
      return NextResponse.json(
        { message: 'تم إرسال الرسالة بنجاح', NewOffers },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: 'حدث خطأ أثناء الإرسال', error: error.message },
        { status: 500 }
      );
    }
  };