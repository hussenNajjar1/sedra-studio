import CredentialsProvider from "next-auth/providers/credentials";
import User from "../models/User";
import bcrypt from "bcryptjs";
import connectMongoDB from "./ConnectMongoDb";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", required: true },
                password: { label: "Password", type: "password", required: true },
            },
            async authorize(credentials) {
                await connectMongoDB();

                if (!credentials.email || !credentials.password) {
                    throw new Error("البريد الإلكتروني وكلمة المرور مطلوبان");
                }

                const user = await User.findOne({ email: credentials.email });

                if (!user) {
                    throw new Error("البريد الإلكتروني أو كلمة المرور غير صحيحة");
                }

                const isValidPassword = await bcrypt.compare(credentials.password, user.password);
                if (!isValidPassword) {
                    throw new Error("البريد الإلكتروني أو كلمة المرور غير صحيحة");
                }

                return { id: user._id.toString(), name: user.name, email: user.email };
            },
        }),
    ],
    callbacks: {
        // async session({ session, token }) {
        //     if (token) {
        //         session.user.id = token.id;
        //     }
        //     return session;
        // },
        // async jwt({ token, user }) {
        //     if (user) {
        //         token.id = user.id;
        //     }
        //     return token;
        // },
        sessionToken: {
            name: process.env.NODE_ENV === "production"
                ? "__Secure-next-auth.session-token"
                : "next-auth.session-token",
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
            },
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    jwt: {
        encryption: false,
    },
    pages: {
        signIn: '/login',
    },
};
