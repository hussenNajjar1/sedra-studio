"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { cairo100, cairo200 } from "../../../../fonts";

const Contact = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const router = useRouter();

    const onSubmit = async (data) => {
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                toast.success("تم إرسال النموذج بنجاح");
                reset(); // إعادة تعيين الحقول بعد الإرسال الناجح
                setTimeout(() => {
                    router.push("/");
                }, 1500);
            } else {
                throw new Error("فشل في إنشاء المشاركة");
            }
        } catch (error) {
            console.error(error);
            toast.error("حدث خطأ أثناء إرسال النموذج، يرجى المحاولة مرة أخرى.");
        }
    };

    return (
        <div className="px-6 Contacts lg:pb-14">
            <div className="pb-16 lg:section  " id="contact">
                <div className="container mx-auto">
                    <h1 className={`text-center text-3xl py-20 ${cairo200.className}`}>
                        تواصل معنا
                    </h1>
                    <div className="flex flex-col lg:flex-row">
                        <form
                            className="flex-1 border   rounded-2xl flex flex-col gap-y-6 p-6 items-start form"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <input
                                className={`bg-transparent text-right border-b py-3 outline-none w-full placeholder-white focus:border-accent transition-all ${cairo100.className}`}
                                type="text"
                                placeholder="الاسم الكامل"
                                {...register("name", { required: "الاسم مطلوب" })}
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

                            <input
                                className={`bg-transparent border-b text-right py-3 outline-none w-full placeholder-white focus:border-accent transition-all ${cairo100.className}`}
                                type="text"
                                placeholder="رقم الواتساب"
                                {...register("phone", {
                                    required: "رقم الواتساب مطلوب",
                                    pattern: {
                                        value: /^[0-9]{8,}$/,
                                        message: "رقم الواتساب يجب أن يحتوي على 8 أرقام على الأقل"
                                    }
                                })}
                            />
                            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

                            <input
                                className={`bg-transparent border-b text-right py-3 outline-none w-full placeholder-white focus:border-accent transition-all ${cairo100.className}`}
                                type="text"
                                placeholder="العنوان"
                                {...register("address", { required: "العنوان مطلوب" })}
                            />
                            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}

                            <textarea
                                className={`bg-transparent border-b text-right py-3 outline-none w-full h-40 placeholder-white focus:border-accent transition-all ${cairo100.className}`}
                                placeholder="اكتب رسالة"
                                {...register("message", { required: "الرسالة مطلوبة" })}
                            />
                            {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}

                            <button className={`btn btn-lg w-full ${cairo200.className}`} type="submit">
                                ارسال
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Contact;
