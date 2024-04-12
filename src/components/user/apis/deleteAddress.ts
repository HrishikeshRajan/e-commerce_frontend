//  Request headers
const headers = new Headers();
headers.set('Accept', 'application/json');
headers.set('Content-Type', 'application/json');

export const deleteAddress = async (addressId:string) => {
  try {
    const url = `${import.meta.env.VITE_BASE_URL}/api/v1/users/address/${addressId}`;
    const response = await fetch(url, {
      method: 'DELETE',
      credentials: 'include',
      headers,
    });
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Something went wrong. Please try again later.');
    } else {
      throw new Error('Something went wrong.');
    }
  }
};
