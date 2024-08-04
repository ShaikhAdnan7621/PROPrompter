// /api/prompt/get/route.js

import { Connect } from "@/utils/dbConnect";
import PromptModel from '@/models/prompt';
import { sendResponse } from '@/utils/responseHelper';
import { getUserIdFromToken } from '@/utils/getUserIdFromToken';

await Connect();

export async function POST(req, res) {
    try {
         
        const body = await req.json();
        const { page, limit } = body;
        const skip = (page - 1) * limit; 

        const cookies = req.cookies.get('token');
        const token = cookies?.value;
        if (!token) {
            return sendResponse(res, 401, { message: 'Unauthorized' });
        }
        const userId = getUserIdFromToken(token);
        if (!userId) {
            return sendResponse(res, 401, { message: 'Unauthorized' });
        }

        const prompts = await PromptModel.find({ author: userId })
            .skip(skip)
            .limit(limit); // Fetch prompts with pagination

        const totalPrompts = await PromptModel.countDocuments({ author: userId }); // Get total number of prompts

        return sendResponse(res, 200, {
            prompts, 
            currentPage: parseInt(page), 
            totalPages: Math.ceil(totalPrompts / limit) // Calculate total pages
        });
    } catch (error) {
        console.error(error);
        return sendResponse(res, 500, { message: 'Internal server error' });
    }
}