/**
 * Types for Seller Accounts
 */

import { ProductCore } from './Product';

interface Order {
  qty: number;
  options: {
    color: string;
    size: string;
  };
  totalPrice: number;
  orderStatus: string;
  gstInPercentage: number;
  taxAmount: number;
  totalPriceBeforeTax: number;
  totalPriceAfterTax: number;
  totalPriceAfterTaxString: string;
  product:ProductCore
  orderId: string;

}

interface OrderObject {
  order: Order;
}

export interface OrdersResponse {
  orders: OrderObject[];
}
