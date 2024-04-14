/* eslint-disable import/no-cycle */

export const getShops = async (signal:any, query:string) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/seller/shops?${query}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      signal,
      credentials: 'include',
    });
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      if (error.name !== 'AbortError') {
        throw new Error('Something went wrong!');
      }
    }
  }
};
