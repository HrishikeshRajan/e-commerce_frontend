import { ORDER } from '@/utils/API';

export async function placeOrder(cartId:string) {
  try {
    const result = await ORDER.post(`/${cartId}`);
    return result;
  } catch (error: any) {
    console.log(error);
  }
}
