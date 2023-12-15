/* eslint-disable import/no-cycle */
import { ShopBaseUrl } from '../../../../constants';

export const deleteShop = async (shopId:string) => {
  try {
    const response = await fetch(`${ShopBaseUrl('shop')}/${shopId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
