/**
 * @author Hrishikesh Rajan
 * edit review
 *
 * @param {string} reviewId - Id of review
 * @returns {Promise<any>} A promise that resolves to the response data from the server.
 * @throws {Error} Throws if something happens
 */

import { ClientReview } from '@/types/Review';

export const createReview = async (values:Omit<ClientReview, '_id' | 'createdAt' | 'updatedAt' | 'userId'> & { userId:string }) => {
  //  Request headers
  const headers = new Headers();
  headers.set('Accept', 'application/json');
  headers.set('Content-Type', 'application/json');

  // Fetch API options
  const requestOptions: RequestInit = {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify(values),
  };
  try {
    const url = `${
      import.meta.env.VITE_BASE_URL
    }/api/v1/review`;
    const response = await fetch(url, requestOptions);
    return await response.json();
  } catch (error) {
    if ((error as Error).name === 'AbortError') return;
    throw new Error("We're unable fetch product. Please try again later.");
  }
};
