import { forgotURL } from './constants';

export const updatePassword = async (user:any, id:string) => {
  try {
    const url = `${forgotURL}/${id}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    // should remove in production
    alert('There was an error during signin. Please try again.');
  }
};
