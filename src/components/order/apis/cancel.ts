const cancelOrder = async (cartId:string, productId:string) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const requestOptions:RequestInit = {
    method: 'PUT',
    credentials: 'include',
    headers,
    redirect: 'follow',
  };
  try {
    const result = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/orders/cancel/carts/${cartId}/products/${productId}`, requestOptions);
    return await result.json();
  } catch (error) {
    console.log(error);
  }
};

export default cancelOrder;
