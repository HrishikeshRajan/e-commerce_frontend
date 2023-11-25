import { baseURL } from '../../auth/apis/constants';

export const deleteAddress = async (id:string) => {
  try {
    const response = await fetch(`${baseURL()}/address/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
      },
      credentials: 'include',
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
