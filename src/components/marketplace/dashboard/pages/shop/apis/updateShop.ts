/* eslint-disable import/no-cycle */
import { ShopBaseUrl } from '../../../../urlConstants';
import { Shop } from '../../../ui/forms/AddForm';

export const updateShop = async (shop:Shop, shopId:string) => {
  try {
    const response = await fetch(`${ShopBaseUrl('shop')}/${shopId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(shop),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
