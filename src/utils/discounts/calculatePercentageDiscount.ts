/* eslint-disable max-len */
import { ClientCartItem, Percentage } from '@/types/Cart';
import { MethodParams } from '@/types/Sale';
import {
  computeDiscountAmount, computeSavings, computeTax, getDiscountPercentage, getFixedDiscountAmount,
} from './validators.utils';

export function calculatePercentageDiscount(cartItem:ClientCartItem, promo:MethodParams, gstInPercentage:number):Percentage | null {
  if (promo.type === 'PERCENTAGE') {
    if (promo.method === 'FLASHSALE') {
      const savings = computeSavings(cartItem, promo);
      const promoObject:Omit<Percentage, 'promoCode'> = {
        type: promo.type,
        method: promo.method,
        originalAmount: cartItem.totalPrice,
        discountPercentage: getDiscountPercentage(promo) ?? 0,
        discountedPrice: computeDiscountAmount(cartItem.totalPrice, savings),
        tax: computeTax(computeDiscountAmount(cartItem.totalPrice, getFixedDiscountAmount(promo) ?? 0), gstInPercentage),
        discountedPriceAftTax: Math.round(computeDiscountAmount(cartItem.totalPrice, savings) + computeTax(computeDiscountAmount(cartItem.totalPrice, savings), gstInPercentage)),
        yourSavings: cartItem.totalPrice - computeDiscountAmount(cartItem.totalPrice, savings),
        couponId: promo._id,

      };
      return promoObject;
    }
    const savings = computeSavings(cartItem, promo);
    const promoObject:Percentage = {
      type: promo.type,
      method: promo.method,
      originalAmount: cartItem.totalPrice,
      discountPercentage: getDiscountPercentage(promo) ?? 0,
      discountedPrice: computeDiscountAmount(cartItem.totalPrice, savings),
      tax: computeTax(computeDiscountAmount(cartItem.totalPrice, getFixedDiscountAmount(promo) ?? 0), gstInPercentage),
      discountedPriceAftTax: Math.round(computeDiscountAmount(cartItem.totalPrice, savings) + computeTax(computeDiscountAmount(cartItem.totalPrice, savings), gstInPercentage)),
      yourSavings: cartItem.totalPrice - computeDiscountAmount(cartItem.totalPrice, savings),
      couponId: promo._id,
      promoCode: promo.code,

    };
    return promoObject;
  }
  return null;
}
