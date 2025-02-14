// lib/connectMongoDB.js
import mongoose from 'mongoose';

const connectMongoDB = async () => {
    if (mongoose.connections[0].readyState) {
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("تم الاتصال بقاعدة بيانات  بنجاح.");
    } catch (error) {
        console.error("حدث خطأ أثناء الاتصال بقاعدة بيانات :", error);
        throw new Error("فشل الاتصال بقاعدة بيانات ");
    }
};

export default connectMongoDB;