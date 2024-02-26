import { FetchErrorResponse, SignupProps } from '..';
import { signinURL } from './constants';

export const errorParser = (response: any) => {
  const errors = response.message.error;
  const errorObj: FetchErrorResponse = {
    error: false,
  };
  errors.map((err: any) => {
    errorObj[err.path[0]] = err.message;
  });
  errorObj.error = true;
  return errorObj;
};

export const signin = async (user: Omit<SignupProps, 'fullname'>) => {
  try {
    const url = signinURL();
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
