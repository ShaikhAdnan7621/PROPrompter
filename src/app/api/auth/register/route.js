
import { Connect } from "@/utils/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { sendResponse } from "@/utils/responseHelper";
import { userSignupSchema } from "@/schemas/userSignupSchema";

Connect();

export async function POST(req, res) {
    try {
        const reqbody = await req.json();
        const { username, email, password } = reqbody;

        const validationResult = userSignupSchema.safeParse(reqbody);
        if (!validationResult.success) {
            return sendResponse(res, 400, {
                message: validationResult.error.details[0].message,
            });
        }
console.log("hellos2")
        const user = await User.findOne({ email });
        if (user) {
            return sendResponse(res, 400, {
                message: "user already exists",
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            email,  
            password: hashedPassword,
        });
        await newUser.save();
        return sendResponse(res, 200, {
            message: "User created successfully",
            user: newUser,
        });
    }
    catch (err) {
        console.log(err)
        return sendResponse(res, 500, { error: err.message });
    }
}