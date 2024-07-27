// src/schemas/promptSchema.js

import { z } from 'zod';

export const PromptSchema = z.object({
    prompt: z.string().min(1, 'Prompt cannot be empty'),
    prompttitle: z.string().min(1, 'Prompt title cannot be empty'),
    prompttype: z.string().min(1, 'Prompt type cannot be empty'),
    isPublic: z.boolean().optional(),
});