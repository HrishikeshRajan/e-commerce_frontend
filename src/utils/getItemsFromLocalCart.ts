/* eslint-disable security/detect-object-injection */
/* eslint-disable no-restricted-syntax */
import {
  ClientCart,
  Options,
} from '@/types/Cart';

export type UploadCartData = {
  productId:string
  qty:number
  options:Options
};
export const getItemsFromLocalCart = (cart:ClientCart) => {
  const cartArray:UploadCartData[] = [];
  const oldCart = cart;

  const { products } = oldCart;
  const keys = Object.keys(products);

  for (const key of keys) {
    const modifiedItem:UploadCartData = {
      productId: '',
      qty: 0,
      options: {
        color: '',
        size: '',
      },
    };
    const item = products[key];
    modifiedItem.options = item.options;
    modifiedItem.qty = item.qty;

    modifiedItem.productId = key;

    cartArray.push(modifiedItem);
  }

  return cartArray;
};
