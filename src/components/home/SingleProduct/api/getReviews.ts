/**
 * @author Hrishikesh Rajan
 * Fetch user reviews
 *
 * @param {string} productId - Id of product
 * @returns {Promise<any>} A promise that resolves to the response data from the server.
 * @throws {Error} Throws an error if the signup request fails.
 */

export const getReviews = async (productId: string, page: number, signal:AbortSignal) => {
  //  Request headers
  const headers = new Headers();
  headers.set('Accept', 'application/json');
  headers.set('Content-Type', 'application/json');

  // Fetch API options
  const requestOptions: RequestInit = {
    method: 'GET',
    headers,
    signal,
  };
  try {
    const url = `${
      import.meta.env.VITE_BASE_URL
    }/api/v1/review?pId=${productId}&page=${page}`;
    const response = await fetch(url, requestOptions);
    return await response.json();
  } catch (error) {
    if ((error as Error).name === 'AbortError') return;
    throw new Error("We're unable fetch product. Please try again later.");
  }
};
