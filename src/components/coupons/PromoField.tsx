/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable security/detect-object-injection */
/* eslint-disable no-restricted-syntax */
import { useTypedDispatch, useTypedSelector } from '@/hooks/user/reduxHooks';
import {
  Promo, PromoArgs, PromoArgsSuccess, PromoFlat, PromoPercentage,
} from '@/types/Promo';
import cart from '@/utils/cart.helper';
import React, { useEffect, useState } from 'react';
import {
  promoError,
  updateAppliedOffer,
} from '@/utils/reduxSlice/cartSlice';
import {
  findCartItemsByCode,
  isPromoCodeFound,
  isCouponActivated,
  isCouponExpired,
  isCouponAtUsageLimit,
  isMinimumAmountPresentInCart,
  getProductId,
  isPromoApplied,
  isNull,
  isUserAlreadyAppliedThePromoCode,
} from '@/utils/discounts/validators.utils';
import { applyFlatDiscount } from '@/utils/discounts/flatDiscount.utils';
import { applyPercentageDiscount } from '@/utils/discounts/percentageDiscount';
import { formattedAmount } from '@/utils/convertToRupees';

/**
 * Tracks couper usage per user count
 */
const uniqProducts = new Set<string>();
const isUserReachedCouponLimit = (response: PromoArgsSuccess[]) => {
  for (const obj of response) {
    const { cartItem, couponIndex } = obj;
    const promo:Promo = cartItem.offers.coupons[couponIndex];
    if (cartItem.appliedOffer?.couponId) {
      uniqProducts.add(cartItem.appliedOffer.productId!);
    }
    if (uniqProducts.size === promo.maxUsagePerUser) {
      return true;
    }
  }

  return false;
};

export function isFlat(promo:PromoPercentage | PromoFlat) : promo is PromoFlat {
  return (promo as PromoFlat).discountAmount !== undefined && promo.type === 'FLAT';
}
export function isPercentage(promo:PromoPercentage | PromoFlat) : promo is PromoPercentage {
  return (promo as PromoPercentage).discountPercentage !== undefined && promo.type === 'PERCENTAGE';
}
function PromoField() {
  const [userCode, setUserCode] = useState<string>('');
  // const [promoError, setPromoError] = useState<string>();
  const promoErrors = useTypedSelector((store) => store.cart.promoError);
  const user = useTypedSelector((store) => store.app.user);
  const dispatch = useTypedDispatch();
  const myCart = useTypedSelector((store) => store.cart.cart);

  /**
   * This will update the local storage with redux current data.
   * This keep data persistence even after page refresh
   */
  useEffect(() => {
    if (myCart) {
      cart.updateCart(myCart);
    }
  }, [myCart]);

  if (!myCart) {
    return <h1>Loading cart</h1>;
  }

  const applyPromoCode = (code:string) => {
    try {
      const response = findCartItemsByCode(code!, Object.values(myCart.products));

      if (isNull<PromoArgs[]>(response)) {
        throw new Error('This coupon is not applicable');
      }
      if (!isPromoCodeFound(response)) {
        throw new Error('This coupon is not applicable to cart products');
      }

      if (isUserReachedCouponLimit(response)) {
        throw new Error('Your coupon limit has reached');
      }

      for (const obj of response) {
        const { cartItem, couponIndex } = obj;
        const promo:Promo = cartItem.offers.coupons[couponIndex];

        // This break when try to apply coupon to again to the discounted gtand total
        // Keep origial grandTotal seprate
        if (!isMinimumAmountPresentInCart(promo, myCart)) {
          throw new Error(`Cart should ahve minimum of ${formattedAmount(promo.minAmountInCart)}`);
        }

        if (!isCouponActivated(promo)) {
          throw new Error('Coupon is not activated');
        }

        if (isCouponExpired(promo)) {
          throw new Error('Coupon is expired');
        }

        if (isCouponAtUsageLimit(promo)) {
          throw new Error('This coupon blocked');
        }

        // Now do the calculations
        const gstInPercentage = 12;

        // Remove promo type and add  flat or percenta union type
        if (promo.type === 'FLAT' && isMinimumAmountPresentInCart(promo, myCart) && !isUserAlreadyAppliedThePromoCode(user, promo, getProductId(cartItem))) {
          const promoObject = applyFlatDiscount(cartItem, promo, gstInPercentage);
          if (!isPromoApplied(cartItem)) {
            if (promoObject) {
              dispatch(updateAppliedOffer({ productId: getProductId(cartItem), item: promoObject }));
            }
          }
        }

        if (promo.type === 'PERCENTAGE' && isMinimumAmountPresentInCart(promo, myCart) && !isUserAlreadyAppliedThePromoCode(user, promo, getProductId(cartItem))) {
          const promoObject = applyPercentageDiscount(cartItem, promo, gstInPercentage);
          if (!isPromoApplied(cartItem)) {
            if (promoObject) {
              dispatch(updateAppliedOffer({ productId: getProductId(cartItem), item: promoObject }));
            }
          }
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        dispatch(promoError(error.message));
      }
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!userCode) {
        throw new Error('Promo Code Required');
      } else {
        // setPromoError('');
        dispatch(promoError(''));
      }
      applyPromoCode(userCode);
    } catch (error) {
      // console.log(error);
      if (error instanceof Error) {
        // console.log(error);
        // setPromoError(error.message);
        dispatch(promoError(error.message));
      }
    }
  };
  return (
    <div className="border-2 border-cyan-100 w-full items-center  rounded-xl flex justify-between flex-col xl:flex-row p-2">

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        {promoErrors && <label htmlFor="promo" className="text-red-500">{promoErrors}</label>}
        <div className="flex gap-2">
          <input type="text" name="promo" id="promo" value={userCode} onChange={(e) => setUserCode(e.target.value)} className={`border-2 p-2 rounded-xl  w-full ${promoErrors ? 'border-2 border-red-500' : 'border-2'}`} placeholder="Promo Code" />
          <button type="submit" className="px-2 py-2 bg-orange-400 rounded-xl font-bold active:scale-105 text-white">Apply </button>

        </div>
      </form>
    </div>
  );
}

export default PromoField;
