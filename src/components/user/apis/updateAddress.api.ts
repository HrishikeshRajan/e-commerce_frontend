import { IAddress} from '..';
import { baseURL } from '../../auth/apis/constants';

export const updateAddress = async (address:IAddress) => {
  try {
    const response = await fetch(`${baseURL()}/address`, {
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
    // alert(error);
    console.log(error)
  }
};
