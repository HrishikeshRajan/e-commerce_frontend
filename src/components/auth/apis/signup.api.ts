import { FetchErrorResponse, SignupFields } from '../index';
import { registerURL } from './constants';

export const errorParser = (errors: any) => {
  if (!errors) return null;
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
    const result = await response.json();

    const parsedError = errorParser(result.message.error);

    return [parsedError, result.message?.message || null];
  } catch (error) {
    console.log(error);
  }
};
