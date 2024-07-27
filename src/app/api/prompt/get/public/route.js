// pages/api/prompt/get/public/route.js

import { Connect } from "@/utils/dbConnect";
import PromptModel from '@/models/prompt';
import { sendResponse } from '@/utils/responseHelper';

await Connect();

export async function PUT(req, res) {
  try {
    const reqbody = await req.json();
    const { search, type, page, showDefaultPrompts } = reqbody;
    // const { search, type, page, showDefaultPrompts } = req.query; 

    const itemsPerPage = 10;
    const currentPage = parseInt(page, 10) || 1;
    const skip = (currentPage - 1) * itemsPerPage;

    let query = { isPublic: true };

    if (showDefaultPrompts) {
      query = { isPublic: true };
    } else {
      // If not default query, apply search and type filters
      if (search) {
        query.prompttitle = { $regex: search, $options: "i" };
      }

      if (type && type !== "All" ) {
        query.prompttype = type;
      }
    }

    const prompts = await PromptModel.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(itemsPerPage)
      .lean();

    // Calculate total pages
    const totalPages = Math.ceil(
      await PromptModel.countDocuments(query) / itemsPerPage
    );

    // Send response with prompts, current page, and total pages
    return sendResponse(res, 200, {
      prompts,
      currentPage,
      totalPages,
    });

  } catch (error) {
    console.error("Error fetching public prompts:", error);
    return sendResponse(res, 500, { message: "Error fetching public prompts." });
  }
}