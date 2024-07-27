// api/prompt/update PUT

import { Connect } from '@/utils/dbConnect';
import PromptModel from '@/models/prompt';
import { sendResponse } from '@/utils/responseHelper';
import { getUserIdFromToken } from '@/utils/getUserIdFromToken';
import { PromptSchema } from '@/schemas/promptSchema';
import { Types } from 'mongoose';

await Connect();

export async function PUT(req, res) {
    try {
        const cookies = req.cookies.get('token'); 
        const token = cookies?.value; 
        if (!token) {
            return sendResponse(res, 401, { message: 'Unauthorized' });
        }
        const userId = getUserIdFromToken(token);
        if (!userId) {
            return sendResponse(res, 401, { message: 'Unauthorized' });
        }

        const body = await req.json(); // Get the body, including promptId
        const promptId = body._id; // Extract promptId from the body

        const validationResult = PromptSchema.safeParse(body);

        if (validationResult.success) {
            const updatedPrompt = await PromptModel.findByIdAndUpdate(
                new Types.ObjectId(promptId),
                validationResult.data,
                { new: true }
            );

            if (!updatedPrompt) {
                return sendResponse(res, 404, { message: 'Prompt not found' });
            }

            return sendResponse(res, 200, { message: 'Prompt updated successfully', data: updatedPrompt });
        } else {
            return sendResponse(res, 400, { message: 'Invalid prompt data', errors: validationResult.error.errors });
        }
    } catch (error) {
        console.error(error);
        return sendResponse(res, 500, { message: 'Internal server error' });
    }
}