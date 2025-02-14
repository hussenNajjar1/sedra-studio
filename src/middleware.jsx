import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(req) {
    const sessionToken = cookies().get(
        process.env.NODE_ENV === "production"
            ? "__Secure-next-auth.session-token"
            : "next-auth.session-token"
    );
    if (!sessionToken) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin", "/admin/:path*"],
};
