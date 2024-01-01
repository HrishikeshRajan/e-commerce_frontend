/* eslint-disable security/detect-object-injection */
/* eslint-disable import/no-cycle */
import { ProductBaseUrl } from '../../../../urlConstants';

export const deleteProductById = async (productId:string) => {
  try {
    const response = await fetch(`${ProductBaseUrl('/')}${productId}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
