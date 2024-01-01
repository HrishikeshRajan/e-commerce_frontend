import { ProductBaseUrl } from '../../../../urlConstants';

export const deleteProductsByIds = async (productsIds:string[]) => {
  try {
    const response = await fetch(`${ProductBaseUrl('multiples')}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productsIds }),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
