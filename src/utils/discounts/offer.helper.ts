import { ProductCore } from '@/types/Product';
import { MethodParams } from '@/types/Sale';
import currency from 'currency.js';
import { computeTax } from './validators.utils';

export function calculatePercentageAmount(cartItem: ProductCore, promo: MethodParams) {
  const discountPercentage = promo.discountPercentage || 100;
  const percentageAmount = (cartItem.price / 100) * discountPercentage;
  return percentageAmount;
}
export function calculateDiscountAmount(originalPrice:number, amountToDiscount:number) {
  return currency(originalPrice).subtract(amountToDiscount).value;
}
export function computeDiscountedAmount(product:ProductCore, flashsale:MethodParams) {
  if (flashsale.type === 'PERCENTAGE') {
    const disountPercentageAmount = calculatePercentageAmount(product, flashsale);
    const discountedAmount = calculateDiscountAmount(product.price, disountPercentageAmount);
    return discountedAmount;
  }
  return 0;
}

export function getFinalAmount(product:ProductCore, flashsale:MethodParams, taxPercentage:number) {
  const totalPriceBeforeTax = computeDiscountedAmount(product, flashsale);
  return Math.round(totalPriceBeforeTax + computeTax(totalPriceBeforeTax, taxPercentage));
}
