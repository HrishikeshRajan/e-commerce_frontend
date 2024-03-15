import { FetchResponse } from '@/types/Fetch';
import { ClientOrder } from '@/types/Orders';

const headers = new Headers();
headers.append('Content-Type', 'application/json');
export async function placeOrder(cartId: string, order: ClientOrder) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/v1/orders/${cartId}`,
      {
        method: 'POST',
        credentials: 'include',
        headers,
        body: JSON.stringify({ shippingAddress: order.shippingAddress }),
      },
    );
    return await response.json() as unknown as FetchResponse;
  } catch (error) {
    throw new Error('We are unable to place your order. Please try again later.');
  }
}
