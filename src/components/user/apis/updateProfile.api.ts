import { UploadProfile } from '../types';

//  Request headers
const headers = new Headers();
headers.set('Accept', 'application/json');
headers.set('Content-Type', 'application/json');

export const updateProfile = async (user:UploadProfile) => {
  try {
    const url = `${import.meta.env.VITE_BASE_URL}/api/v1/users/profile`;
    const response = await fetch(url, {
      method: 'PUT',
      credentials: 'include',
      headers,
      body: JSON.stringify(user),
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
