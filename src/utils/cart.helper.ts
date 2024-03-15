/* eslint-disable arrow-body-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-restricted-syntax */
/* eslint-disable security/detect-object-injection */
import {
  Cart,
  ClientCart,
  ClientCartItem,
  Item,
  ORDER_STATUS,
  Options,
} from '@/types/Cart';
import { ProductCore } from '@/types/Product';
import { isEmpty } from 'lodash';
import currency from 'currency.js';
import { IFlashSale } from '@/types/Sale';
import { v4 as uuidv4 } from 'uuid';
import { CartPrice } from './price.utils';

function sumQty(products: Record<string, Item>) {
  return Object.values(products).reduce(
    (totalQty, item) => totalQty + item.qty,
    0,
  );
}
function sumPrice(products: Record<string, Item>) {
  return Object.values(products).reduce(
    (totalPrice, item) => totalPrice + item.product.price * item.qty,
    0,
  );
}

/* New APIs */
const totalQty = (products: Record<string, ClientCartItem>): number => {
  return Object.values(products).reduce((total, item) => total + item.qty, 0);
};
const getGrandTotal = (products: Record<string, ClientCartItem>) => {
  const productsArray = Object.values(products);
  let total = 0;
  for (const item of productsArray) {
    total = currency(total).add(item.totalPriceAfterTax).value;
  }
  return total.toFixed();
};

const setToLocalStorage = <T>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};
const getLocalStorageItem = <T>(key: string): T | null => {
  const item = localStorage.getItem(key);
  if (!item) return null;
  return JSON.parse(item);
};

const cart = {
  // Updated
  addToCart: (product: ProductCore, options: Options) => {
    const productId = product._id;
    try {
      if (typeof window === 'undefined') return;
      const emptyCart: ClientCart = {
        userId: uuidv4(),
        cartId: '',
        products: {},
        grandTotalPrice: 0,
        grandTotalQty: 0,
      };
      const gstInPercentage = 12;
      const isCartExists = getLocalStorageItem<ClientCart>('cart');
      const userCart: ClientCart = isCartExists ?? emptyCart;

      if (
        !isEmpty(userCart)
        && !isEmpty(userCart.products)
        && userCart.products[productId] !== undefined
      ) {
        const item = userCart.products[productId]!;
        if (item.product.stock < item.qty + 1) {
          return null;
        }
        item.qty += 1;
        item.totalPrice = item.product.price * item.qty;
        const price = new CartPrice(item.totalPrice);
        item.options.color = options.color;
        item.options.size = options.size;
        item.taxAmount = price.getTaxAmount();
        item.totalPriceBeforeTax = price.getInitialPrice();
        item.totalPriceAfterTax = price.getMRP();
        userCart.products[productId] = item;
      } else {
        const price = new CartPrice(product.price);
        const item: ClientCartItem = {
          qty: 1,
          totalPrice: price.getInitialPrice(),
          options,
          product,
          orderStatus: ORDER_STATUS.NOT_PROCESSED,
          gstInPercentage,
          taxAmount: price.getTaxAmount(),
          totalPriceBeforeTax: price.getInitialPrice(),
          totalPriceAfterTax: price.getMRP(),
        };
        userCart.products[productId] = item;
      }
      const grandTotalQty = totalQty(userCart.products);
      userCart.grandTotalQty = grandTotalQty;
      userCart.grandTotalPrice = Number(getGrandTotal(userCart.products));
      setToLocalStorage<ClientCart>('cart', userCart);
      return userCart;
    } catch (error) {
      console.log(error);
    }
  },
  addToCartFlash: (
    product: ProductCore,
    options: Options,
    sale: IFlashSale,
  ) => {
    const productId = product._id;
    try {
      if (typeof window === 'undefined') return;
      const emptyCart: Cart = {
        products: {},
        grandTotalPrice: 0,
        grandTotalQty: 0,
      };
      const userCart: Cart = JSON.parse(localStorage.getItem('cart')!) || emptyCart;

      if (!isEmpty(userCart) && userCart.products[productId]) {
        const item = userCart.products[productId];
        item.qty += 1;
        item.totalPrice = Math.floor(item.product.price * item.qty);
        item.options.color = options.color;
        item.options.size = options.size;
        userCart.products[productId] = item;
      } else {
        const item: Item = {
          product,
          qty: 1,
          totalPrice: sale.priceAfterDiscount!, // assgin discounted price
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
  updateCart: (userCart: ClientCart) => {
    try {
      if (typeof window === 'undefined') return;
      if (!userCart || typeof userCart === 'undefined') return;
      localStorage.setItem('cart', JSON.stringify(userCart));
      return userCart;
    } catch (error) {
      console.log(error);
    }
  },
  getCount: () => {
    try {
      if (typeof window === 'undefined') return;
      if (typeof window === 'undefined') return;
      const userCart = getLocalStorageItem<ClientCart>('cart');
      if (!userCart) return null;
      return userCart.grandTotalQty;
    } catch (error) {
      console.log(error);
    }
  },
  // Updated
  get: () => {
    try {
      if (typeof window === 'undefined') return;
      const userCart = getLocalStorageItem<ClientCart>('cart');
      if (!userCart) return null;
      return userCart;
    } catch (error) {
      console.log(error);
    }
  },
  getCartId: () => {
    try {
      if (typeof window === 'undefined') return;
      const userCart = getLocalStorageItem<ClientCart>('cart');
      if (!userCart) return null;
      return userCart.cartId;
    } catch (error) {
      console.log(error);
    }
  },
  // Updated
  updateSize: (size: string, productId: string) => {
    try {
      if (typeof window === 'undefined') return;
      const userCart = getLocalStorageItem<ClientCart>('cart');
      if (!userCart) return;

      if (!isEmpty(userCart) && userCart.products[productId]) {
        const item = userCart.products[productId];
        item.options.size = size;
        userCart.products[productId] = item;
      }

      setToLocalStorage<ClientCart>('cart', userCart);
      return userCart;
    } catch (error) {
      console.log(error);
    }
  },
  // Updated
  updateQty: (qty: number, productId: string):ClientCart | null => {
    if (typeof window === 'undefined') return null;
    const userCart = getLocalStorageItem<ClientCart>('cart');
    if (!userCart) return null;
    try {
      if (!isEmpty(userCart) && userCart.products[productId]) {
        const item = userCart.products[productId];
        if (item.product.stock < qty) {
          return null;
        }
        item.qty = qty;

        item.totalPrice = item.product.price * item.qty;
        const price = new CartPrice(item.totalPrice);
        item.taxAmount = price.getTaxAmount();
        item.totalPriceBeforeTax = price.getInitialPrice();
        item.totalPriceAfterTax = price.getMRP();
        userCart.products[productId] = item;
      }
      const grandTotalQty = totalQty(userCart.products);
      userCart.grandTotalQty = grandTotalQty;
      userCart.grandTotalPrice = Number(getGrandTotal(userCart.products));
      setToLocalStorage<ClientCart>('cart', userCart);
    } catch (error) {
      console.log(error);
    }
    return userCart;
  },

  clearCart: () => {
    try {
      if (typeof window === 'undefined') return;
      localStorage.removeItem('cart');
    } catch (error) {
      console.log(error);
    }
  },
  updateCartAndUserId: (userId:string, cartId: string) => {
    try {
      if (typeof window === 'undefined') return;
      const userCart = getLocalStorageItem<ClientCart>('cart');
      if (!userCart) return;

      userCart.cartId = cartId;
      userCart.userId = userId;
      setToLocalStorage('cart', userCart);
      return userCart;
    } catch (error) {
      console.log(error);
    }
  },
  clearItemFromLocalStoarge: (productId: string) => {
    try {
      if (typeof window === 'undefined') return;
      const userCart = getLocalStorageItem<ClientCart>('cart');
      if (!userCart || isEmpty(userCart.products)) return null;
      if (userCart.products[productId]) {
        delete userCart.products[productId];
      }

      const grandTotalQty = totalQty(userCart.products);
      userCart.grandTotalQty = grandTotalQty;
      userCart.grandTotalPrice = Number(getGrandTotal(userCart.products));
      setToLocalStorage<ClientCart>('cart', userCart);
      const dummyItem:ClientCart = {
        userId: '',
        cartId: '',
        products: {},
        grandTotalPrice: 0,
        grandTotalQty: 0,
      };
      return dummyItem;
    } catch (error) {
      console.log(error);
    }
  },
};

export default cart;
