
// src/models/prompt.js

import mongoose from 'mongoose';

const PromptSchema = new mongoose.Schema({
    prompt: {
        type: String,
        required: true,
    },
    prompttitle: {
        type: String,
        required: true,
    },
    prompttype: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    usageCount: {
        type: Number,
        default: 0,
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
});

const PromptModel = mongoose.models.Prompt || mongoose.model("Prompt", PromptSchema);
export default PromptModel;