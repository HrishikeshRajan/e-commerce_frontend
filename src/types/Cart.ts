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
};
