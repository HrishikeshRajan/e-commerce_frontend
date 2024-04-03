import { UploadAddress } from '../types';

//  Request headers
const headers = new Headers();
headers.set('Accept', 'application/json');
headers.set('Content-Type', 'application/json');

export const updateAddress = async (address:UploadAddress, addressId:string) => {
  try {
    const url = `${import.meta.env.VITE_BASE_URL}/address/${addressId}`;
    const response = await fetch(url, {
      method: 'PUT',
      credentials: 'include',
      headers,
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
