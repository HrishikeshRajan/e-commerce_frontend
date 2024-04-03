import { SignupProps } from '../types/index';

/**
 * @author Hrishikesh Rajan
 * Makes a signup request to the server.
 *
 * @param {SignupFields} fields - The signup fields to be sent to the server.
 * @returns A promise that resolves to the response data from the server.
 * @throws {Error} Throws an error if the signup request fails.
 */

export const signup = async (fields: SignupProps) => {
  //  Request headers
  const headers = new Headers();
  headers.set('Accept', 'application/json');
  headers.set('Content-Type', 'application/json');

  // Fetch API options
  const requestOptions: RequestInit = {
    method: 'POST',
    headers,
    body: JSON.stringify(fields),
  };
  try {
    const url = `${import.meta.env.VITE_BASE_URL}/api/v1/users/register`;
    const response = await fetch(url, requestOptions);
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Something went wrong. Please try again later.');
    } else {
      throw new Error('Something went wrong.');
    }
  }
};
