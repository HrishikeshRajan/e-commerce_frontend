/* eslint-disable security/detect-object-injection */
/* eslint-disable import/no-cycle */

export const deleteProductById = async (productId:string) => {
  try {
    const url = `${import.meta.env.VITE_BASE_URL}/api/v1/product`;
    const response = await fetch(`${url}${productId}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
