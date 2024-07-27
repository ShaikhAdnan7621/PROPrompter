// /api/prompt/create/route.js

import { Connect } from '@/utils/dbConnect';
import PromptModel from '@/models/prompt';
import { sendResponse } from '@/utils/responseHelper';
import { getUserIdFromToken } from '@/utils/getUserIdFromToken';
import { PromptSchema } from '@/schemas/promptSchema';

await Connect();

export async function POST(req, res) {
    try {
        const cookies = req.cookies.get('token'); // Use getCookies to retrieve the cookie
        const token = cookies?.value; // Access the cookie value
        if (!token) {
            return sendResponse(res, 401, { message: 'Unauthorized' });
        }
        const userId = getUserIdFromToken(token);
        if (!userId) {
            return sendResponse(res, 401, { message: 'Unauthorized' });
        }
        const body = await req.json();

        const validationResult = PromptSchema.safeParse(body);
        if (validationResult.success) {
            const newPrompt = new PromptModel({
                ...validationResult.data,
                author: userId,
            });

            await newPrompt.save();
            return sendResponse(res, 201, { message: 'Prompt created successfully', data: newPrompt });
        } else {
            return sendResponse(res, 400, { message: 'Invalid prompt data', errors: validationResult.error.errors });
        }

    } catch (error) {
        console.error(error);
        return sendResponse(res, 500, { message: 'Internal server error' });
    }
}