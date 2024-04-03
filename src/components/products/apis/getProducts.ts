export async function getProductsByQuery(
  query:string,
  signal: AbortSignal,
) {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/list?${query}`, {
      method: 'GET',
      credentials: 'include',
      signal,
    });
    return await response.json();
  } catch (error:any) {
    if (error.name === 'AbortError') {
      return;
    }
    console.log(error);
  }
}
