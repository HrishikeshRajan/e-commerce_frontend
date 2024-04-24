/**
 * Types for Seller Accounts
 */

import { Options } from './Cart';
import { ProductCore } from './Product';

/**
 * New API Types
 */

export interface PaymentDetails {
  status:string
  paymentId:string
  paidAmount:number
}
export interface OrderDetails {
  status:string
  fullfiled:string,
}
export interface Address {
  fullname: string
  city: string
  homeAddress: string
  state: string
  postalCode: string
  phoneNo: string
  country: string
  _id:string
  isPrimary?:boolean
  isDefault?:boolean
}
export interface ClientOrder {
  userId: string
  cartId: string
  shippingAddress:Address
  paymentDetails:PaymentDetails
  orderDetails:OrderDetails
  orderId:string
}

/**
 * Final Type
 *
 */

type ProductId = { productId:string };
export type FinalOrder = {
  product: Omit<ProductCore, '_id'> & ProductId
  qty: number;
  options: Options;
  totalPrice: number;
  orderStatus: string;
  gstInPercentage: number;
  taxAmount: number;
  totalPriceBeforeTax: number;
  totalPriceAfterTax: number;
  cartId: string;
  orderDate: string;
  paymentDetails: {
    status: string;
  };
  customerId: {
    _id: string;
    fullname: string;
    email: string;
  };
  orderId: string;
};
