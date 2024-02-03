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
