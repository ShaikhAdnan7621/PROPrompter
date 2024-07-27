// src/schemas/userSignupSchema.js

import { z } from 'zod';

export const userSignupSchema = z.object({
    username: z.string().min(4, 'Username must be at least 4 characters long'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long').regex(/^(?=.*[!@#$%^&*(),.?":{}|<>])/),
});
