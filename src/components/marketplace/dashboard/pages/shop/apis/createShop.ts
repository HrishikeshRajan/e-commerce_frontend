/* eslint-disable import/no-cycle */
import { Shop } from '../../../ui/forms/AddForm';

export const createNewShop = async (shop:Shop) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/seller/shop`, {
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
