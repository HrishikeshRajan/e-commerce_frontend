/**
 * @author Hrishikesh Rajan
 * Fetch flash sale
 *
 * @returns {Promise<any>} A promise that resolves to the response data from the server.
 * @throws {Error} Throws an error if the signup request fails.
 */

export const getSale = async ():Promise<any> => {
  //  Request headers
  const headers = new Headers();
  headers.set('Accept', 'application/json');
  headers.set('Content-Type', 'application/json');

  // Fetch API options
  const requestOptions:RequestInit = {
    method: 'GET',
    headers,
    redirect: 'follow',
  };
  try {
    const url = `${import.meta.env.VITE_BASE_URL}/api/v1/seller/flashsale`;
    const response = await fetch(url, requestOptions);
    return await response.json();
  } catch (error) {
    throw new Error('We\'re unable fetch sale. Please try again later.');
  }
};
