/* eslint-disable max-len */

import { isEmpty } from 'lodash';
import { useTypedSelector } from '@/hooks/user/reduxHooks';
import PageWaiting from '@/utils/animations/PageWaiting';
import CartCard from './CartCard';
import ClearCartBtn from './ClearCartBtn';
import PromoField from '../coupons/PromoField';

function CartItem() {
  const myCart = useTypedSelector((store) => store.cart.cart);
  if (!myCart) {
    return <PageWaiting loading={myCart !== undefined} />;
  }

  return (
    <div className="lg:w-5/12 w-full mt-32 md:mt-40 pb-20 lg:mt-32 shadow-sm  rounded ">
      <div className="flex  w-full justify-between">

        <h1 className="text-slate-900 font-bold text-lg py-3">
          Cart Items
          <span className="text-slate-600 font-light">
            (
            {myCart && myCart.grandTotalQty}
            )
          </span>
        </h1>
        <div className="flex gap-2">
          {myCart && !isEmpty(myCart.products) && <ClearCartBtn cartId={myCart.cartId} />}
        </div>
      </div>
      { myCart && myCart.products && !isEmpty(myCart.products) && Object.entries(myCart.products)
        .map(([id, product]) => <CartCard key={id} cartItem={product} cartId={myCart.cartId} />)}

      <PromoField />
    </div>
  );
}

export default CartItem;
