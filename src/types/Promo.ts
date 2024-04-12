/* eslint-disable import/no-cycle */
import { ClientCartItem } from './Cart';

export interface Promo {
  offername: string;
  banner: {
    secure_url: string;
  };
  type: 'PERCENTAGE' | 'FLAT' | 'FREE SHIPPING';
  method: 'COUPON' | 'VOUCHER';
  startTime: string;
  endTime: string;
  code: string;
  discountPercentage?: number;
  maxUsage: number;
  maxUsagePerUser: number;
  usedBy: [{ userId: string, count: number, products:string[] }]
  discountAmount?: number;
  minAmountInCart: number;
  tags: {
    products: string[];
  };
  status: string;
  _id: string;
}

export interface PromoUpload {
  offername: string;
  image:string;
  type: 'PERCENTAGE' | 'FLAT' | 'FREE SHIPPING';
  method: 'COUPON' | 'VOUCHER';
  startTime: string;
  endTime: string;
  code: string;
  discountPercentage?: number;
  maxUsage: number;
  maxUsagePerUser: number;
  usedBy: [{ userId: string; count: number }];
  discountAmount?: number;
  minAmountInCart: number;
  tags: {
    products: string[];
  };
  status: string;
}

type UsedBy = { userId: string; count: number };

export interface IPromo {
  offername: string;
  banner: {
    secure_url: string;
  };
  type: 'PERCENTAGE' | 'FLAT' | 'FREE SHIPPING';
  method: 'COUPON' | 'VOUCHER';
  startTime: string;
  endTime: string;
  code: string;
  maxUsage: number;
  maxUsagePerUser: number;
  usedBy: Array<UsedBy>;
  minAmountInCart: number;
  tags: {
    Products?: string[];
    categories?: string[];
    users?: string[];
  };
  status: string;
  _id: string;
}
export interface PromoPercentage extends IPromo {
  discountPercentage: number;
}
export interface PromoFlat extends IPromo {
  discountAmount: number;
}

export interface PromoFreeShipping extends IPromo {
  discountAmount: number;
}

export type PromoArgsSuccess = {
  cartItem:ClientCartItem;
  couponIndex:number
};
export type PromoArgsError = null;
export type PromoArgs = PromoArgsSuccess | PromoArgsError;
