/**
 * @author Hrishikesh Rajan
 *
 * Fetches all products categories from server
 *
 * @param {AbortSignal} signal
 * @returns {Promise<any>} A promise that resolves to the response data from the server.
 * @throws {Error} Throws an error if fetch fails
 */

export const getCategories = async (signal:AbortSignal) => {
  //  Request headers
  const headers = new Headers();
  headers.set('Accept', 'application/json');

  // Fetch API options
  const requestOptions:RequestInit = {
    method: 'GET',
    headers,
    signal,
    cache: 'no-cache'
  };
  try {
    const url = `${import.meta.env.VITE_BASE_URL}/api/v1/seller/categories`;
    const response = await fetch(url, requestOptions);
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      if (error.name !== 'AbortError') {
        throw new Error('Something went wrong. Please try again later.');
      }
    }
  }
};
