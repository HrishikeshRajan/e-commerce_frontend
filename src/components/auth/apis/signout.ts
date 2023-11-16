/* eslint-disable no-alert */
import { signoutURL } from './constants';

export const signout = async () => {
  try {
    const response = await fetch(signoutURL, { method: 'GET', credentials: 'include' });
    return await response.json();
  } catch (error) {
    return false;
  }
};
