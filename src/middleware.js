// src/middleware.js

import { NextResponse } from 'next/server'

export function middleware(request) {
    const path = request.nextUrl.pathname
    const publicPaths = path === "/";
    const authPaths = path === "/auth/login" || path === "/auth/signup";
    const privetPaths = path.includes("/chat") || path.includes("/prompts")
    const token = request.cookies.get("token") ? request.cookies.get("token").value : null;

    if (!token && privetPaths) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }
    if (token && authPaths) {
        return NextResponse.redirect(new URL('/', request.url))
    }
    if (!token && authPaths) {
        return NextResponse.next()
    }
    if (!token && !publicPaths) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    return NextResponse.next()
}


export const config = {
    matcher: [
        "/",
        "/auth/signup",
        "/auth/login",
        "/auth/logout",
        "/Chat/:path*",
        "/prompts/:path*",
        "/chat",
        "/prompts",
    ],
}
