/* eslint-disable import/no-cycle */

export const deleteShops = async (shopsIds:string[]) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/seller/shop/multiples`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ shopsIds }),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
