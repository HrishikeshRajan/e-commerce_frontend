//  Request headers
const headers = new Headers();
headers.set('Accept', 'application/json');
headers.set('Content-Type', 'application/json');

export const listMyProfile = async (signal:AbortSignal) => {
  try {
    const url = `${import.meta.env.VITE_BASE_URL}/profile`;
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers,
      signal,
    });
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      if (error.name !== 'AbortError') {
        throw new Error('Something went wrong. Please try again later.');
      }
    } else {
      throw new Error('Something went wrong.');
    }
  }
};
