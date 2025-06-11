import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get('token')

    if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/users/login", req.url))

    }

    return NextResponse.next()

}

export const config = {
    mathcer: '/dashboard/:path*'
}