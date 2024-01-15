import queryString from 'query-string';
import { ProductBaseUrl } from '../../../utils/uri/productUri';

export async function getProductsByQuery(query:any, signal:any) {
  try {
    const response = await fetch(`${ProductBaseUrl(`list?${queryString.stringify(query)}`)}`, {
      method: 'GET',
      credentials: 'include',
      signal,
    });
    return await response.json();
  } catch (error:any) {
    if (error.name === 'AbortError') {
      return;
    }
    console.log(error);
  }
}

export async function getInitialProducts(category:string, signal:any) {
  try {
    const response = await fetch(`${ProductBaseUrl(`list?page=1&category=${category}`)}`, {
      method: 'GET',
      credentials: 'include',
      signal,
    });
    return await response.json();
  } catch (error:any) {
    if (error.name === 'AbortError') {
      return;
    }
    console.log(error);
  }
}
