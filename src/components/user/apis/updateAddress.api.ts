import { IAddress } from '..';
import { baseURL } from '../../auth/apis/constants';

export const updateAddress = async (address:Omit<IAddress, '_id'>, id:string) => {
  try {
    const response = await fetch(`${baseURL()}/address/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(address),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
