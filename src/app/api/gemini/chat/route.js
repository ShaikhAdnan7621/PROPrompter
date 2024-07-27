
// /api/gemini/chat/route.js

import { Connect } from '@/utils/dbConnect';
import { sendResponse } from '@/utils/responseHelper';
import { getUserIdFromToken } from '@/utils/getUserIdFromToken';
import generateGeminiText from '@/utils/geminiconfig/gemini';
import { PromptHistorySchema } from '@/schemas/promptHistorySchema';

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
        const validatedHistory = PromptHistorySchema.safeParse(body.history);

        if (validatedHistory.success) {
            const response = await generateGeminiText(
                validatedHistory.data, // Pass the validated history 
                body.prompt
            );

            // Send the response back to the frontend
            return sendResponse(res, 200, { message: response });
        } else {
            console.error("Invalid chat history:", validatedHistory.error.message);
            return sendResponse(res, 400, { message: 'Invalid chat history' });
        }
    } catch (error) {
        console.error(error);
        return sendResponse(res, 500, { message: 'Internal server error' });
    }
}