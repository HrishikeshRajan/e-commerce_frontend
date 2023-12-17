/* eslint-disable import/no-cycle */
import { ShopBaseUrl } from '../../../../urlConstants';
import { Shop } from '../../../ui/forms/AddForm';

export const createNewShop = async (shop:Shop) => {
  try {
    const response = await fetch(`${ShopBaseUrl('shop')}`, {
      method: 'POST',
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
