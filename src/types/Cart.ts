/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/naming-convention */
import { OfferProps } from '@/components/home/SingleProduct';
import { ProductCore } from './Product';

/*
Types 2
*/

export interface Options {
  color:string
  size:string
}

export enum ORDER_STATUS {
  NOT_PROCESSED = 'Not_processed',
  PROCESSING = 'Processing',
  SHIPPED = 'Shipped',
  CANCELED = 'CANCELED',
  DELIVERED = 'Delivered',
}

export type Method = 'COUPON' | 'VOUCHER' | 'FLASHSALE' | 'CLEARENCE_SALE';
export type Percentage = {
  type:'PERCENTAGE',
  method: Method,
  originalAmount:number,
  discountPercentage: number,
  discountedPrice:number,
  tax:number,
  discountedPriceAftTax:number,
  yourSavings:number
  couponId:string
  productId?:string
  promoCode?: string
};
export type Flat = {
  type:'FLAT',
  method:Method,
  originalAmount:number,
  discountFixedAmount: number,
  discountedPrice:number,
  tax:number
  discountedPriceAftTax:number,
  yourSavings:number
  couponId:string
  productId?:string
  promoCode?: string
};

export type ClientCartItem = {
  product: ProductCore
  qty: number
  options: Options
  totalPrice: number
  totalPriceBeforeTax: number
  totalPriceAfterTax:number
  orderStatus:ORDER_STATUS
  gstInPercentage:number
  taxAmount:number
  offers:OfferProps
  appliedOffer?:Percentage | Flat
};
export type ClientCart = {
  userId: string
  cartId:string
  products: Record<string, ClientCartItem>
  grandTotalPrice: number
  grandTotalQty: number
  mode?:string
};
