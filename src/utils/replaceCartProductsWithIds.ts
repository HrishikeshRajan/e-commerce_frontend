/* eslint-disable security/detect-object-injection */
/* eslint-disable no-restricted-syntax */
import {
  Cart, ModifiedCart, ModifiedItem,
} from '@/types/Cart';

export const replaceCartProductsWithIds = (cart:Cart) => {
  const oldCart = cart;
  const newCart:ModifiedCart = {
    products: {},
    grandTotalPrice: oldCart.grandTotalPrice,
    grandTotalQty: oldCart.grandTotalQty,
  };

  const { products } = oldCart;
  const keys = Object.keys(products);

  for (const key of keys) {
    const modifiedItem:ModifiedItem = {
      productId: '',
      qty: 0,
      totalPrice: 0,
      options: {
        color: '',
        size: '',
      },
    };
    const item = products[key];
    modifiedItem.options = item.options;
    modifiedItem.qty = item.qty;
    modifiedItem.totalPrice = item.totalPrice;

    modifiedItem.productId = key;

    newCart.products[key] = modifiedItem;
  }

  return { cart: newCart };
};
