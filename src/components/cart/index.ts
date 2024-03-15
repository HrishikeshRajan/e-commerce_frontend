import { ClientCart } from '@/types/Cart';

export interface SuccessWithCartResponse {
  mycart:ClientCart
}
type CartResponse = SuccessWithCartResponse | undefined;
export function hasUserCart(
  response: CartResponse,
): response is SuccessWithCartResponse {
  return (response as SuccessWithCartResponse).mycart !== undefined;
}
