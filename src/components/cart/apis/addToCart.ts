import { ModifiedCart } from '@/types/Cart';
import { CART } from '@/utils/API';

const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');

export async function submitCart(cart:{ cart: ModifiedCart }) {
  const requestOptions:RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(cart),
    redirect: 'follow',
    credentials: 'include',
  };
  try {
    const response = await fetch(CART.getUri(), requestOptions);
    return await response.json();
  } catch (error: any) {
    console.log(error);
  }
}
