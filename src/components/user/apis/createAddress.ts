import { UploadAddress } from '../types';

//  Request headers
const headers = new Headers();
headers.set('Accept', 'application/json');
headers.set('Content-Type', 'application/json');

export const createAddress = async (address:UploadAddress) => {
  try {
    const url = `${import.meta.env.VITE_BASE_URL}/api/v1/users/address`;
    const response = await fetch(url, {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify(address),
    });
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Something went wrong. Please try again later.');
    } else {
      throw new Error('Something went wrong.');
    }
  }
};
