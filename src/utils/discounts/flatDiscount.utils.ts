/* eslint-disable max-len */
import { ClientCartItem, Flat } from '@/types/Cart';
import { Promo } from '@/types/Promo';
import {
  computeDiscountAmount, computeTax, getFixedDiscountAmount, getProductId,
} from './validators.utils';

export function applyFlatDiscount(cartItem:ClientCartItem, promo:Promo, gstInPercentage:number) {
  let promoObject: Flat;
  if (promo.type === 'FLAT') {
    promoObject = {
      type: promo.type,
      method: promo.method,
      originalAmount: cartItem.totalPrice,
      discountFixedAmount: getFixedDiscountAmount(promo) ?? 0,
      discountedPrice: computeDiscountAmount(cartItem.totalPrice, getFixedDiscountAmount(promo) ?? 0),
      tax: computeTax(computeDiscountAmount(cartItem.totalPrice, getFixedDiscountAmount(promo) ?? 0), gstInPercentage),
      discountedPriceAftTax: computeDiscountAmount(cartItem.totalPrice, getFixedDiscountAmount(promo) ?? 0) + computeTax(computeDiscountAmount(cartItem.totalPrice, getFixedDiscountAmount(promo) ?? 0), gstInPercentage),
      yourSavings: getFixedDiscountAmount(promo) ?? 0,
      couponId: promo._id,
      productId: getProductId(cartItem),
      promoCode: promo.code,
    };
    return promoObject;
  }
}
