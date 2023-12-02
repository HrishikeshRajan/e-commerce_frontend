import { z } from 'zod';

export const editProfileSchema = z.object({
  fullname: z.string(),
  username: z.string(),
  email: z.string().email(),
});
