/* eslint-disable import/no-cycle */
import { Promo } from './Promo';

export interface UploadFlashSale {
  _id:string;
  name: string;
  method: 'FLASHSALE'
  type: 'PERCENTAGE' | 'FLAT'
  image:string
  startTime: string;
  endTime: string;
  discountAmount?:number;
  discountPercentage?: number;
  product: string;
  totalQuantityToSell: number;
  currentStock: number;
  status: 'ACTIVE' | 'PENDING' | 'EXPIRED';
  position? : 'TOP' | 'MIDDLE' | 'BOTTOM'
}

export interface ClientFlashSale {
  name: string;
  method: 'FLASHSALE';
  type: 'PERCENTAGE' | 'FLAT';
  banner: {
    secure_url: string;
  };
  startTime: Date;
  endTime: Date;
  discountPercentage?: number;
  discountAmount?:number;
  priceAfterDiscount?: number;
  product: string;
  totalQuantityToSell: number;
  currentStock: number;
  users: {
    maxUsersCount: number;
    usedBy: string[];
  };
  status: string;
  createdAt: Date;
  shop?: string;
  position: 'TOP' | 'MIDDLE' | 'BOTTOM'
  _id:string;
}

export type MethodParams = Promo | ClientFlashSale;
