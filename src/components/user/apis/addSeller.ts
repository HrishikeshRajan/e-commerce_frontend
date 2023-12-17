import { sellerBaseUrl } from '../../marketplace/urlConstants';

export const activateSeller = async (status:boolean, userId:string) => {
  try {
    const response = await fetch(`${sellerBaseUrl('activate', userId)}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ seller: status }),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
