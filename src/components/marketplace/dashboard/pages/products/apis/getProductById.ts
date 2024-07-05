export const getProductById = async (productId:string) => {
  try {
    const url = `${import.meta.env.VITE_BASE_URL}/api/v1/product`;
    const response = await fetch(`${url}seller/product/${productId}`, {
      method: 'GET',
      credentials: 'include',
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
