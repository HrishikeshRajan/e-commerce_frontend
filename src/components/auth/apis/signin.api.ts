import { SigninProps } from '../types';

const headers = new Headers();
headers.set('Accept', 'application/json');
headers.set('Content-Type', 'application/json');
export const signin = async (user: SigninProps) => {
  try {
    //  Request headers

    const url = `${import.meta.env.VITE_BASE_URL}/api/v1/users/login`;
    const response = await fetch(url, {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify(user),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Something went wrong. Please try again later.');
    } else {
      throw new Error('Something went wrong.');
    }
  }
};
