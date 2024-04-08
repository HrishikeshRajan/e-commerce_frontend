export async function getProductsByQuery(
  query:string,
  signal: AbortSignal,
) {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/product/list?${query}`, {
      method: 'GET',
      credentials: 'include',
      signal,
    });
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return;
      }
      throw new Error('Oops, something went wrong');
    }
  }
}
