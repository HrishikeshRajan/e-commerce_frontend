import { baseURL } from '../../auth/apis/constants';

export const listMyProfile = async (signal:any) => {
  try {
    const response = await fetch(`${baseURL()}/profile`, {
      method: 'GET',
      signal,
      credentials: 'include',
    });
    return await response.json();
  } catch (error) {
    // alert(error);
    console.log(error);
  }
};
