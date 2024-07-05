export const deleteProductsByIds = async (productsIds:string[]) => {
  const url = `${import.meta.env.VITE_BASE_URL}/api/v1/product`;
  try {
    const response = await fetch(`${url}/multiples`, {
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
