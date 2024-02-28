/**
 * @author Hrishikesh Rajan
 * Makes a forgot password request to the server.
 *
 * @param {string} email - The field to be sent to the server.
 * @returns {Promise<any>} A promise that resolves to the response data from the server.
 * @throws {Error} Throws an error if the signup request fails.
 */

export const forgot = async (email: string):Promise<any> => {
  //  Request headers
  const headers = new Headers();
  headers.set('Accept', 'application/json');
  headers.set('Content-Type', 'application/json');

  // Fetch API options
  const requestOptions:RequestInit = {
    method: 'POST',
    headers,
    body: JSON.stringify({ email }),
    redirect: 'follow',
  };
  try {
    const url = `${import.meta.env.VITE_BASE_URL}/api/v1/users/forgot`;
    const response = await fetch(url, requestOptions);
    return await response.json();
  } catch (error) {
    throw new Error('We\'re unable to process your password reset request. Please try again later.');
  }
};
