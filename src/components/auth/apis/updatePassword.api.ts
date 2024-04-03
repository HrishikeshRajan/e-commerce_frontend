export const updatePassword = async (user: any) => {
  try {
    //  Request headers
    const headers = new Headers();
    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/json');
    const url = `${import.meta.env.VITE_BASE_URL}/api/v1/users/forgot/reset`;
    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify(user),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Something went wrong. Please try again later.');
    } else {
      throw new Error('Something went wrong.');
    }
  }
};
