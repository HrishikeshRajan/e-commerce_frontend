import { FetchErrorResponse, SignupFields } from '../index';
import { registerURL } from './constants';

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
export const signup = async (fields: SignupFields) => {
  try {
    const url = registerURL();
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fields),
    });
    return await response.json();
  } catch (error) {
    // should remove in production
    alert('There was an error during signup. Please try again.');
  }
};
