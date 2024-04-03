/* eslint-disable no-await-in-loop */
export const deleteCart = async (cartId: string): Promise<any> => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/cart/${cartId}`, {
      credentials: 'include',
      method: 'DELETE',
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
