export const getSidebarOptions = async (signal:AbortSignal, query:string) => {
  //  Request headers
  const headers = new Headers();
  headers.set('Accept', 'application/json');

  // Fetch API options
  const requestOptions:RequestInit = {
    method: 'GET',
    headers,
    signal,
  };
  try {
    const url = `${import.meta.env.VITE_BASE_URL}/api/v1/product/filter${query ? `?category=${query}` : ''}`;
    const response = await fetch(url, requestOptions);
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      if (error.name !== 'AbortError') {
        throw new Error('Something went wrong. Please try again later.');
      }
    }
  }
};
