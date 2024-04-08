export async function getSingleProduct(
  productId:string,
) {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/product/item/${productId}`, {
      method: 'GET',
      credentials: 'include',
    });
    return (await response.json()) as unknown;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return;
      }
      throw new Error('Oops, something went wrong');
    }
  }
}
