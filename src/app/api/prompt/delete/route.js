// api/prompt/delete/route.js DELETE

import { Connect } from '@/utils/dbConnect';
import PromptModel from '@/models/prompt';
import { sendResponse } from '@/utils/responseHelper';
import { getUserIdFromToken } from '@/utils/getUserIdFromToken';
import { Types } from 'mongoose';

await Connect();

export async function DELETE(req, res) {
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

        const reqbody = JSON.parse(await req.text());
        const promptId = reqbody._id;
        const validPromptId = new Types.ObjectId(promptId);

        const deletedPrompt = await PromptModel.findByIdAndDelete(validPromptId);

        if (!deletedPrompt) {
            return sendResponse(res, 404, { message: 'Prompt not found' });
        }

        return sendResponse(res, 200, { message: 'Prompt deleted successfully' });
    } catch (error) {
        console.error(error);
        return sendResponse(res, 500, { message: 'Internal server error' });
    }
}                   