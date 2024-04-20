/* eslint-disable import/no-cycle */

export const deleteShop = async (shopId:string) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/seller/shop/${shopId}`, {
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
