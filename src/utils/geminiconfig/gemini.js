// utils/geminiconfig/gemini.js

import {
    GoogleGenerativeAI,
} from "@google/generative-ai";
import { log } from 'console';

const generateGeminiText = async (history, message) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const generationConfig = {
            temperature: 1,
            topP: 0.95,
            topK: 64,
            maxOutputTokens: 8192,
            responseMimeType: "text/plain",
        };
        const chatSession = model.startChat({
            generationConfig,
            history: history
        });
        const result = await chatSession.sendMessage(message);
        return result.response.text()
    } catch (error) {
        log(`Error generating text: ${error.message}`);
        throw error; // Re-throw to allow for handling higher up in the code
    }
};

export default generateGeminiText;