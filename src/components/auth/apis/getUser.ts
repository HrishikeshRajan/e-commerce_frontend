/**
 * @author Hrishikesh Rajan
 * fetches user details
 *
 * @returns {Promise<any>} A promise that resolves to the response data from the server.
 * @throws {Error} Throws an error if the signup request fails.
 */

export const getUser = async (signal:AbortSignal):Promise<any> => {
  //  Request headers
  const headers = new Headers();
  headers.set('Accept', 'application/json');
  headers.set('Content-Type', 'application/json');

  // Fetch API options
  const requestOptions:RequestInit = {
    method: 'GET',
    headers,
    signal,
    credentials: 'include',
  };
  try {
    const url = `${import.meta.env.VITE_BASE_URL}/api/v1/users/read`;
    const response = await fetch(url, requestOptions);
    return await response.json();
  } catch (error) {
    if ((error as Error).name === 'AbortError') {
      return;
    }
    throw new Error('We\'re unable to process your signup request. Please try again later.');
  }
};
