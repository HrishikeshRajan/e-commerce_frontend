import { ClientCart } from '@/types/Cart';
import CartCard from './CartCard';

function CartList({ myCart }:{ myCart:ClientCart }) {
  return (
    <>
      {Object.entries(myCart.products)
        .map(([id, product]) => <CartCard key={id} cartItem={product} cartId={myCart.cartId} />)}
    </>
  );
}

export default CartList;
