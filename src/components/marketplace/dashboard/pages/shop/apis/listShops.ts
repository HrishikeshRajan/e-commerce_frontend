/* eslint-disable import/no-cycle */
import { ShopBaseUrl } from '../../../../urlConstants';

export const getShops = async (signal:any, userId:string) => {
  try {
    const response = await fetch(`${ShopBaseUrl('shop')}/${userId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      signal,
      credentials: 'include',
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
