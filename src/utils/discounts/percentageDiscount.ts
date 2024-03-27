/* eslint-disable max-len */
import { ClientCartItem, Percentage } from '@/types/Cart';
import { Promo } from '@/types/Promo';
import {
  computeDiscountAmount, computeSavings, computeTax, getDiscountPercentage, getFixedDiscountAmount,
} from './validators.utils';

export function applyPercentageDiscount(cartItem:ClientCartItem, promo:Promo, gstInPercentage:number) {
  let promoObject:Percentage;
  if (promo.type === 'PERCENTAGE') {
    const savings = computeSavings(cartItem, promo);
    promoObject = {
      type: 'PERCENTAGE',
      originalAmount: cartItem.totalPrice,
      discountPercentage: getDiscountPercentage(promo) ?? 0,
      discountedPrice: computeDiscountAmount(cartItem.totalPrice, savings),
      tax: computeTax(computeDiscountAmount(cartItem.totalPrice, getFixedDiscountAmount(promo) ?? 0), gstInPercentage),
      discountedPriceAftTax: computeDiscountAmount(cartItem.totalPrice, savings) + computeTax(computeDiscountAmount(cartItem.totalPrice, savings), gstInPercentage),
      yourSavings: cartItem.totalPrice - computeDiscountAmount(cartItem.totalPrice, savings),
      couponId: promo._id,
      promoCode: promo.code,

    };
    return promoObject;
  }
}
