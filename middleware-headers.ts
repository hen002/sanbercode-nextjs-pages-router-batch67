import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const res = NextResponse.next()
    res.headers.set('X_API_KEY', 'API_KEY_TEST')
    return res
}

export const config = {
    mathcer: '/:path*'
}