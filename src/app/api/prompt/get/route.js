// /api/prompt/get/route.js

import { Connect } from "@/utils/dbConnect";
import PromptModel from '@/models/prompt';
import { sendResponse } from '@/utils/responseHelper';
import { getUserIdFromToken } from '@/utils/getUserIdFromToken';

await Connect();

export async function POST(req, res) {
    try {
        // Fetch prompts from MongoDB for the current user
        const cookies = req.cookies.get('token'); // Use getCookies to retrieve the cookie
        const token = cookies?.value; // Access the cookie value
        if (!token) {
            return sendResponse(res, 401, { message: 'Unauthorized' });
        }
        const userId = getUserIdFromToken(token);
        if (!userId) {
            return sendResponse(res, 401, { message: 'Unauthorized' });
        }

        const prompts = await PromptModel.find({ author:userId }); // Fetch prompts associated with the user ID

        return sendResponse(res, 200, { prompts }); // Send the prompts as a response
    } catch (error) {
        console.error(error);
        return sendResponse(res, 500, { message: 'Internal server error' });
    }
}
