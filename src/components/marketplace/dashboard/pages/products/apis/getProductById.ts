import { ProductBaseUrl } from '../../../../urlConstants';

export const getProductById = async (productId:string) => {
  try {
    const response = await fetch(`${ProductBaseUrl(`seller/product/${productId}`)}`, {
      method: 'GET',
      credentials: 'include',
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
