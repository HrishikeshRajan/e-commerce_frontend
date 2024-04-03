/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/naming-convention */
import { OfferProps } from '@/components/home/SingleProduct';
import { ProductCore } from './Product';

/**
 * @deprecated
 */
export type CartClient = { [x:string]:ProductCore };

export type ProductWithOptions = ProductCore & Options;

export type Item = {
  product:ProductCore,
  qty:number
  totalPrice?:number
  options:Options
};

export interface Options {
  color:string
  size:string
}
export type Cart = {
  products:Record<string, Item>
  grandTotalPrice?:number
  grandTotalQty:number
  userId?:string
  cartId?:string
};
export type ModifiedItem = {
  productId:string,
  qty:number
  totalPrice?:number
  options:Options
};
export type ModifiedCart = {
  products:{ [x:string]:ModifiedItem }
  grandTotalPrice?:number
  grandTotalQty:number
};

/*
Types 2
*/

export enum ORDER_STATUS {
  NOT_PROCESSED = 'Not_processed',
  PROCESSING = 'Processing',
  SHIPPED = 'Shipped',
  CANCELED = 'CANCELED',
  DELIVERED = 'Delivered',
}

export interface CartItemDocument {
  productId: ProductCore;
  qty: number;
  options: Options;
  totalPrice: number;
  totalPriceBeforeTax: number;
  totalPriceAfterTax:number;
  totalPriceAfterTaxString:string;
  orderStatus:ORDER_STATUS;
  gstInPercentage:number;
  taxAmount:number;
}

export interface CartCore {
  userId: string;
  products: Map<string, CartItemDocument> | null;
  grandTotalPrice: number;
  grandTotalPriceString: string;
  grandTotalQty: number;
  updatedAt:string
  cartId:string
}

/**
 *  New Type
 *
 */

export interface ServerCartItem {
  productId: ProductCore
  qty: number
  options: Options
  totalPrice: number
  totalPriceBeforeTax: number
  totalPriceAfterTax:number
  orderStatus:ORDER_STATUS
  gstInPercentage:number
  taxAmount:number
}
export interface ServerCart {
  userId: string
  cartId:string
  products: Record<string, ServerCartItem> | null
  grandTotalPrice: number
  grandTotalQty: number

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

export type CartData = ClientCart | ServerCart;
