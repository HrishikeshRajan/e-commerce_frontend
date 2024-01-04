/* eslint-disable import/no-cycle */
import { ShopBaseUrl } from '../../../../urlConstants';

export const deleteShops = async (shopsIds:string[]) => {
  try {
    const response = await fetch(`${ShopBaseUrl('shop')}/multiples`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ shopsIds }),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
