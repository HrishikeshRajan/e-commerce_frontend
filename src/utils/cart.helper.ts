/* eslint-disable security/detect-object-injection */
import {
  Cart, Item, Options,
} from '@/types/Cart';
import { ProductCore } from '@/types/Product';
import { isEmpty } from 'lodash';

function sumQty(products:{ [x:string]:Item }) {
  return Object.values(products).reduce((totalQty, item) => totalQty + item.qty, 0);
}
function sumPrice(products:{ [x:string]:Item }) {
  return Object.values(products)
    .reduce((totalPrice, item) => totalPrice + item.product.price * item.qty, 0);
}

const cart = {
  addToCart: (product:ProductCore, options:Options) => {
    const productId = product._id;
    try {
      if (typeof window === 'undefined') return;
      const emptyCart:Cart = {
        products: {},
        grandTotalPrice: 0,
        grandTotalQty: 0,
      };
      const userCart:Cart = JSON.parse(localStorage.getItem('cart')!) || emptyCart;
      if (!isEmpty(userCart) && userCart.products[productId]) {
        const item = userCart.products[productId];
        item.qty += 1;
        item.totalPrice = Math.floor(item.product.price * item.qty);
        userCart.products[productId] = item;
        item.options.color = options.color;
        item.options.size = options.size;
      } else {
        const item:Item = {
          product,
          qty: 1,
          totalPrice: product.price * 1,
          options,
        };
        userCart.products[productId] = item;
      }

      const grandTotalQty = sumQty(userCart.products);
      userCart.grandTotalQty = grandTotalQty;
      const grandTotalPrice = sumPrice(userCart.products);
      userCart.grandTotalPrice = grandTotalPrice;
      localStorage.setItem('cart', JSON.stringify(userCart));
      return userCart;
    } catch (error) {
      console.log(error);
    }
  },
  getCount: () => {
    try {
      if (typeof window === 'undefined') return;

      const userCart:Cart = JSON.parse(localStorage.getItem('cart')!);
      return userCart.grandTotalQty;
    } catch (error) {
      console.log(error);
    }
  },
};

export default cart;
