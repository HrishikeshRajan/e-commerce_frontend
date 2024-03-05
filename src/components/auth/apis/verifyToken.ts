/**
 * @author Hrishikesh Rajan
 * Makes a token verifying request to the server.
 * @param {string} token
 * @returns {Promise<any>} A promise that resolves to the response data from the server.
 * @throws {Error} Throws an error if token is expird or modified.
 */

type QueryProps = {
  token:string
  path:string
  tokenKey:string
};
export const verifyToken = async ({ token, tokenKey, path }:QueryProps):Promise<any> => {
  //  Request headers
  const headers = new Headers();
  headers.set('Accept', 'application/json');
  headers.set('Content-Type', 'application/json');

  // Fetch API options
  const requestOptions:RequestInit = {
    method: 'GET',
    headers,
  };
  try {
    const url = `${import.meta.env.VITE_BASE_URL}/${path}?${tokenKey}=${token}`;
    const response = await fetch(url, requestOptions);
    return await response.json();
  } catch (error:any) {
    throw new Error('We\'re unable to process your token verification request. Please try again later.');
  }
};
