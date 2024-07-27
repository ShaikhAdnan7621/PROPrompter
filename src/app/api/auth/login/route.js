// /api/auth/login/route.js
import { Connect } from '@/utils/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcrypt';
import { sendResponse } from '@/utils/responseHelper';
import { generateToken } from '@/utils/tokenHelper';
import { userLoginSchema } from '@/schemas/userLoginSchema';
import { NextResponse } from 'next/server';

await Connect();

export async function POST(req, res) {
    try {
        const body = await req.json();
        const { username, password } = body;

        const validationResult = userLoginSchema.safeParse(body);
        if (!validationResult.success) {
            console.log(validationResult.error.flatten().fieldErrors);
            return sendResponse(res, 400, {
                message: 'Invalid request body',
                errors: validationResult.error.flatten
                    ().fieldErrors,
            });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return sendResponse(res, 400, {
                message: 'User not found',
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return sendResponse(res, 400, {
                message: 'Invalid password',
            });
        }

        const token = generateToken(user._id);
        const response = NextResponse.json(
            { message: 'User logged in successfully' },
            { status: 200 }
        );
        response.cookies.set('token', token, {
            httpOnly: true,
            path: '/',
        });
        return response;
    } catch (error) {
        console.error(error);
        return sendResponse(res, 500, { message: 'Internal server error' });
    }
}
