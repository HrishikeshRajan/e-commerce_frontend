import { CART } from '@/utils/API';

const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');

export async function updateProductSize(size:string, productId:string, cartId:string) {
  try {
    const result = await CART.put(`size/products/${productId}/carts/${cartId}`, { size }, { withCredentials: true });
    return result.data;
  } catch (error: any) {
    console.log(error);
  }
}
