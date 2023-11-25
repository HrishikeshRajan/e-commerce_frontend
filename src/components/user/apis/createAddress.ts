import { IAddress } from '..';
import { baseURL } from '../../auth/apis/constants';

export const createAddress = async (address:Omit<IAddress, '_id'>) => {
  try {
    const response = await fetch(`${baseURL()}/address`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(address),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
