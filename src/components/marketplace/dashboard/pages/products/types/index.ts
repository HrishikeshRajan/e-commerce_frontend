import { z } from 'zod';

export const ProductCoreSchema = z.object({
  name: z.string(),
  price: z.number(),
  currencyCode: z.string(),
  description: z.string(),
  category: z.string(),
  brand: z.string(),
  sizes: z.string(),
  color: z.string(),
  gender: z.string(),
  isDiscontinued: z.boolean(),
  keywords: z.string().optional(),
  id: z.string().optional(),
  shopId: z.string(),
  stock: z.number(),
});

export type IProduct = z.infer<typeof ProductCoreSchema>;
