// schemas/promptHistorySchema.js

import { z } from 'zod';

export const PromptHistorySchema = z.array(
    z.object({
        role: z.enum(['user', 'model']),
        parts: z.array(
            z.object({
                text: z.string(),
            })
        ),
    })
);
