/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
import { ClientCart } from '@/types/Cart';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useTypedDispatch, useTypedSelector } from '@/hooks/user/reduxHooks';
import cart from '@/utils/cart.helper';
import { getItemsFromLocalCart } from '@/utils/getItemsFromLocalCart';
import { addToCart, promoError } from '@/utils/reduxSlice/cartSlice';
import { isFetchBadRequestError, isFetchSuccess, isFetchUnauthorizedError } from '@/types/Fetch';
import { removeUser } from '@/utils/reduxSlice/appSlice';
import Button from '../auth/ui/Button';
import { submitCart } from './apis/addToCart';
import { hasUserCart } from '.';
import 'react-toastify/dist/ReactToastify.css';
import AuthHelper from '../auth/apis/helper';

function Checkout({ summary }:{ summary:ClientCart }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const hasUser = useTypedSelector((store) => store.app.user);
  const dispatch = useTypedDispatch();

  /**
   * Sends post request to create cart
   * @returns void
   */
  const createCart = () => {
    setLoading(true);
    const cartData = cart.get();
    if (!cartData) return;
    const modifiedCart = getItemsFromLocalCart(cartData!);

    let path = '';

    // currently flash sale cart is not handled properly
    if (cartData.mode && cartData.mode === 'flash') {
      path = 'api/v1/cart';
    } else {
      path = 'api/v1/cart';
    }
    submitCart(modifiedCart, path)
      .then((result) => {
        setLoading(false);
        if (isFetchSuccess(result)) {
          if (hasUserCart(result.message)) {
            const copyCart = cart.updateCart(result.message.mycart);
            if (!copyCart) throw new Error('Cart not found');
            dispatch(addToCart(result.message.mycart || copyCart!));
            navigate('/address');
          }
        } else if (isFetchUnauthorizedError(result)) {
          AuthHelper.clearSignedOnData(() => {
            dispatch(removeUser());
            navigate('/auth');
          });
        } else if (isFetchBadRequestError(result)) {
          dispatch(promoError(result.error));
        }
      }).catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  /** Clear the error message */
  useEffect(() => () => {
    dispatch(promoError(''));
  }, [dispatch]);

  return (
    hasUser && Object.values(hasUser).length > 1

      ? (
        loading ? (
          <Button
            mode="loading"
            type="button"
            loadingAnimation
            className=" mt-5 text-white cursor-wait  w-full p-2 rounded-lg disabled:bg-gray-950 "
            disabled
          >
            loading
          </Button>
        ) : (
          <Button
            mode="idle"
            type="button"
            onClick={createCart}
            className={` mt-5 text-white  w-full p-2  ${summary && isEmpty(summary.products) ? 'disabled:bg-slate-600 cursor-auto' : 'bg-gray-950 active:scale-95 ease-in-out duration-300'} rounded-xl`}
            disabled={summary && !!isEmpty(summary.products)}
          >
            PROCEDE TO CHECKOUT
          </Button>
        )
      )

      : (
        <Button
          mode="idle"
          type="button"
          onClick={() => navigate('/auth?redirect=cart')}
          className={` mt-5 text-white  w-full p-2  ${summary && isEmpty(summary.products) ? 'disabled:bg-slate-600 cursor-auto' : 'bg-gray-950 active:scale-95 ease-in-out duration-300'} rounded`}
          disabled={false}
        >
          LOGIN TO CHECKOUT
        </Button>
      )
  );
}

export default Checkout;