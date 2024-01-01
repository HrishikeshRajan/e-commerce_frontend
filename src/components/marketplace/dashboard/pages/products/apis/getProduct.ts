/* eslint-disable security/detect-object-injection */
/* eslint-disable import/no-cycle */
import { ProductBaseUrl } from '../../../../urlConstants';

export const getProductsBySellerId = async (query:string) => {
  try {
    const response = await fetch(`${ProductBaseUrl(`seller/list?${query}`)}`, {
      method: 'GET',
      credentials: 'include',
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
