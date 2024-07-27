// api/auth/logout/route.js POST

import { NextResponse } from "next/server";
import { sendResponse } from "@/utils/responseHelper";
import { cookies } from "next/headers";

export async function POST(req) {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get("token");

        if (token) {
            cookieStore.delete("token");
            return NextResponse.redirect(new URL("/login", req.url));
        } else {
            return NextResponse.json({ message: "Already logged out" });
        }
    } catch (error) {
        return sendResponse(NextResponse, 500, {
            message: "Internal Server Error",
            error: error,
        });
    }
}


