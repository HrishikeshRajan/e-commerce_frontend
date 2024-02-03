import { CART } from '@/utils/API';

const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');

export async function updateCartQty(qty:number, productId:string, cartId:string) {
  try {
    const result = await CART.put(`qty/products/${productId}/carts/${cartId}`, { qty }, { withCredentials: true });
    return result.data;
  } catch (error: any) {
    console.log(error);
  }
}
