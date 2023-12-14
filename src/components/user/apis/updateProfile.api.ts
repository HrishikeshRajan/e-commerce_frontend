import { IUser } from '..';
import { baseURL } from '../../auth/apis/constants';

export const updateProfile = async (user:Pick<IUser, 'fullname' | 'email' | 'username' >) => {
  try {
    const response = await fetch(`${baseURL()}/profile`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (error) {
    // alert(error);
  }
};
