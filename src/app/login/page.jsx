"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LableForm from "../components/Forms/LableForm";
import { cairo200, cairo100 } from "../../../fonts";

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      toast.error(result.error);  // إشعار بالفشل
    } else {
      toast.success("تم تسجيل الدخول بنجاح!");  // إشعار بالنجاح
      router.push("/");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen  login ">
      <div className="bg-[#1F0C3A ]  border border-[#3f216d]  p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className={`text-2xl font-bold text-center text-white  mb-6 ${cairo200.className}`}>تسجيل الدخول</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">

          <div className="space-y-3">
            <div className="text-right">
              <LableForm lable="البريد الإلكتروني " />
            </div>
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              className={`w-full p-3 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right ${cairo100.className}`}
              {...register("email", { required: "البريد الإلكتروني مطلوب" })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="space-y-3">
            <div className="text-right">
              <LableForm lable="كلمة المرور " />
            </div>
            <input
              type="password"
              placeholder="كلمة المرور"
              className={`w-full p-3 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right ${cairo100.className}`}
              {...register("password", { required: "كلمة المرور مطلوبة" })}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div>
            <button
              type="submit"
              className={`w-full p-3 bg-[#341361] text-white rounded-lg hover:bg-[#41206e] transition duration-200 ${cairo100.className}`}
            >
              تسجيل الدخول
            </button>
          </div>
        </form>
      </div>

      {/* مكان إشعارات Toast */}
      <ToastContainer />
    </div>
  );
}
