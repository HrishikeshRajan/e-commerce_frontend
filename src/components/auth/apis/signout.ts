/* eslint-disable no-alert */

export const signout = async () => {
  try {
    const url = `${import.meta.env.VITE_BASE_URL}/api/v1/users/signout`;
    const response = await fetch(url, { method: 'GET', credentials: 'include' });
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Something went wrong. Please try again later.');
    } else {
      throw new Error('Something went wrong.');
    }
  }
};
