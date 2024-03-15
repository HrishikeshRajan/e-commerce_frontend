import { ProductCore } from './Product';

export interface IFlashSale {
  name: string;
  category: string;
  banner: { secure_url: string };
  startTime: Date;
  endTime: Date;
  discountPercentage?: number;
  priceAfterDiscount?: number;
  product: ProductCore;
  totalQuantityToSell?: number;
  currentStock?: number;
  users: {
    maxUsersCount: number;
    usedBy: string[];
  };
  status: string;
  createdAt: Date;
  _id:string
}
