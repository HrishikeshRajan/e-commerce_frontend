import { FetchResponse } from '@/types/Fetch';

const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');

export async function getAddresses(
  path: string,
  signal: AbortSignal,
) {
  const requestOptions: RequestInit = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
    credentials: 'include',
    signal,
  };
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/${path}`,
      requestOptions,
    );
    return (await response.json()) as unknown as FetchResponse;
  } catch (error: unknown) {
    if ((error as Error).name === 'AbortError') return null;
    throw new Error('Failed to fetch user addresses. Please retry later.');
  }
}
