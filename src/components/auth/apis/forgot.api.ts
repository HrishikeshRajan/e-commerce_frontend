import { forgotURL } from './constants';

export const forgot = async (user:any) => {
  try {
    const url = forgotURL;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(user),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    // should remove in production
    alert('There was an error during signin. Please try again.');
  }
};
