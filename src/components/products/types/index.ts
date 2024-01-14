import { z } from 'zod';

const ImageSchema = z.object({
  url: z.string(),
  secure_url: z.string(),
});

export const productSchema = z.object({
  name: z.string(),
  price: z.string(),
  currencyCode: z.string(),
  description: z.string(),
  category: z.string(),
  brand: z.string(),
  sellerId: z.string().optional(),
  sizes: z.array(z.string()),
  color: z.string(),
  gender: z.string(),
  isDiscontinued: z.string(),
  keywords: z.array(z.string()).optional(),
  shopId: z.string(),
  stock: z.string(),
  _id: z.string(),
  ratings: z.number(),
  images: z.array(ImageSchema),
  numberOfReviews: z.number(),
});

export type ProductUser = z.infer<typeof productSchema>;
