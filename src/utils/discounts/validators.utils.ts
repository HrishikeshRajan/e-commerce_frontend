/* eslint-disable security/detect-object-injection */
import { IUser } from '@/components/user';
import { ClientCartItem, ClientCart } from '@/types/Cart';
import { Promo, PromoArgsSuccess } from '@/types/Promo';
import { MethodParams } from '@/types/Sale';
import currency from 'currency.js';

// Type predicate
export function isPromoCodeFound(response:PromoArgsSuccess[] | []): response is PromoArgsSuccess[] {
  return (response !== null && (response as PromoArgsSuccess[]).length > 0);
}

export function isNull<T>(response :T | null): response is null {
  return response === null;
}
// Helpers
/**
   * This function only filter based on code
   * @param codeToFind
   * @param cartItems
   * @returns
   */
export function findCartItemsByCode(codeToFind:string, cartItems:ClientCartItem[]) {
  if (!cartItems.length) return null;
  const arr: PromoArgsSuccess[] = [];
  for (let i = 0; i < cartItems.length; i += 1) {
    const cartItem = cartItems[i];
    if (!cartItem.offers) {
      throw new Error('No offers available');
    }
    const couponIndex = cartItem.offers.coupons.findIndex((coupon) => coupon.code === codeToFind);
    if (couponIndex !== -1) {
      const result: PromoArgsSuccess = { cartItem, couponIndex };
      arr.push(result);
    }
  }
  return arr;
}

export function isCouponAssignedToProduct(promo:Promo, productId:string) {
  return (promo.tags.products && promo.tags.products.indexOf(productId) > -1);
}

export function getProductId(cartItem:ClientCartItem) {
  return cartItem.product._id;
}

export function getUserId(userStore:IUser) {
  return userStore._id;
}
export function isUserAlreadyAppliedThePromoCode(
  userStore:IUser | null,
  promo:Promo,
  productId:string,
) {
  if (!userStore) return false;

  const userId = getUserId(userStore);
  const userIndex = promo.usedBy.findIndex((user) => user.userId === userId);
  const userData = promo.usedBy[userIndex];
  if (!userData) return false;
  const productIndex = userData.products.findIndex((id) => id === productId);
  return productIndex > -1;
}

export function isCouponActivated(promo:Promo) {
  return promo.status === 'ACTIVE';
}

export function isCouponExpired(promo:Promo) {
  return promo.status === 'EXPIRED';
}
/**
   * @deprecated
   * Check a single coupons is applied more than allowed count
   */
export function hasCouponBeenRedeemed(promo:Promo, userId:string) {
  const userObj = promo.usedBy.find((user) => user.userId.toString() === userId);
  if (!userObj) return null;
  return (userObj.count >= promo.maxUsagePerUser);
}

export function isCouponAtUsageLimit(promo:Promo) {
  return (Number(promo.maxUsage) < 1);
}

export function isMinimumAmountPresentInCart(promo:Promo, usercart:ClientCart) {
  return (usercart.grandTotalPrice > promo.minAmountInCart);
}

export function computeTax(totalPriceBeforeTax:number, gstInPercentage:number) {
  const tax = currency(totalPriceBeforeTax).multiply(gstInPercentage).divide(100);
  return Math.round(tax.value);
}

export function computeSavings(cartItem:ClientCartItem, promo:MethodParams) {
  const discountPercentage = promo.discountPercentage || 100;
  const savings = (cartItem.totalPrice / 100) * discountPercentage;
  return Math.round(savings);
}

export function computeDiscountAmount(originalPrice:number, amountToDiscount:number) {
  return Math.round(currency(originalPrice).subtract(amountToDiscount).value);
}

export function getDiscountPercentage(promo:MethodParams) {
  if (promo.type === 'PERCENTAGE') {
    return promo.discountPercentage;
  }
  return null;
}

export function getFixedDiscountAmount(promo:MethodParams) {
  if (promo.type === 'FLAT') {
    return promo.discountAmount;
  }
  return -1;
}

export function isPromoApplied(cartItem:ClientCartItem) {
  return cartItem.appliedOffer !== undefined
  && cartItem.appliedOffer.productId === cartItem.product._id;
}
