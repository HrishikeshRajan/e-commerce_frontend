import { z } from 'zod';

// Define the owner schema
const OwnerSchema = z.object({
  _id: z.string(),
  fullname: z.string(),
});

// Define the shop schema
const ShopSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string().email(),
  owner: OwnerSchema,
  created: z.string(),
  isActive: z.boolean(),
});

// Define the main schema for the entire JSON structure
const MainSchema = z.object({
  shops: z.array(ShopSchema),
  totalItems: z.number(),
});

export type ShopList = z.infer< typeof MainSchema>;
export type IShop = z.infer< typeof ShopSchema>;
