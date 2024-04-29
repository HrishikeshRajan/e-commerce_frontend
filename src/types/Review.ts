import { z } from 'zod';

export interface ClientReview {
  _id: string;
  userId: { fullname: string; _id: string; photo: { secure_url: string } };
  productId: string;
  title: string;
  description: string;
  star: number;
  createdAt: Date;
  updatedAt: Date;
}

export const ReviewZodSchema = z.object({
  userId: z.string().optional(),
  productId: z.string().optional(),
  title: z.string(),
  description: z.string(),
  star: z.number().int().min(0).max(5),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
