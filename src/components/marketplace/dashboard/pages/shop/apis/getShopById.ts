/* eslint-disable import/no-cycle */

export const getShopById = async (signal:any, shopId:string) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/seller/shop/${shopId}`, {
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
