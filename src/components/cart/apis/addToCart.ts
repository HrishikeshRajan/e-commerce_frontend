import { FetchResponse } from '@/types/Fetch';
import { UploadCartData } from '@/utils/getItemsFromLocalCart';

const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');

export async function submitCart(cart: UploadCartData[], path:string):Promise<FetchResponse> {
  const requestOptions:RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(cart),
    redirect: 'follow',
    credentials: 'include',
  };
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/${path}`, requestOptions);
    return await response.json() as unknown as FetchResponse;
  } catch (error: any) {
    throw new Error('Failed to add item to cart. Please retry later.');
  }
}
