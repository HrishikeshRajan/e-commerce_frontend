/* eslint-disable @typescript-eslint/naming-convention */
import { ProductCore } from './Product';

export type CartClient = { [x:string]:ProductCore };

export type ProductWithOptions = ProductCore & Options;

export type Item = {
  product:ProductCore,
  qty:number
  totalPrice:number
  options:Options
};

export interface Options {
  color:string
  size:string
}
export type Cart = {
  products:{ [x:string]:Item }
  grandTotalPrice:number
  grandTotalQty:number
  userId?:string
  cartId?:string
};
export type ModifiedItem = {
  productId:string,
  qty:number
  totalPrice:number
  options:Options
};
export type ModifiedCart = {
  products:{ [x:string]:ModifiedItem }
  grandTotalPrice:number
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

export interface CartDocument {
  userId: string;
  products: Map<string, CartItemDocument> | null;
  grandTotalPrice: number;
  grandTotalPriceString: string;
  grandTotalQty: number;
  _id:string
  updatedAt:string
  cartId:string
}
