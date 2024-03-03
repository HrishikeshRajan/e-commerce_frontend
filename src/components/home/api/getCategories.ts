/**
 * @author Hrishikesh Rajan
 *
 * Fetches all products categories from server
 *
 * @param {AbortSignal} signal
 * @returns {Promise<any>} A promise that resolves to the response data from the server.
 * @throws {Error} Throws an error if the signup request fails.
 */

export const getCategories = async (signal:AbortSignal):Promise<any> => {
  //  Request headers
  const headers = new Headers();
  headers.set('Accept', 'application/json');

  // Fetch API options
  const requestOptions:RequestInit = {
    method: 'GET',
    headers,
    signal,
  };
  try {
    const url = `${import.meta.env.VITE_BASE_URL}/api/v1/seller/categories`;
    const response = await fetch(url, requestOptions);
    return await response.json();
  } catch (error) {
    if ((error as Error).name === 'AbortError') {
      return;
    }
    throw new Error('We\'re unable to fetch the categories. Please try again later.');
  }
};
