/* eslint-disable no-await-in-loop */
export const deleteCart = async (cartId: string): Promise<any> => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/cart/${cartId}`, {
      credentials: 'include',
      method: 'DELETE',
    });
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Unable to delete the cart');
    }
  }
};
