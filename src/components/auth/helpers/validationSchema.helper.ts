import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(4).email(),
  password: z.string(),
});

export const emailSchema = z.object({
  email: z.string().min(4).email(),
});

export const passwordSchema = z.object({
  password: z.string(),
});
