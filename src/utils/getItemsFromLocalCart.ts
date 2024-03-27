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
  saleId?:string
  promoCode?:string
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
      promoCode: '',
    };

    const item = products[key];
    modifiedItem.options = item.options;
    modifiedItem.qty = item.qty;

    modifiedItem.productId = key;

    if (item.offers?.flashsale) {
      modifiedItem.saleId = item.offers.flashsale._id!;
    }

    if (item.appliedOffer && item.appliedOffer.couponId) {
      modifiedItem.promoCode = item.appliedOffer.promoCode;
    }

    cartArray.push(modifiedItem);
  }

  return cartArray;
};
