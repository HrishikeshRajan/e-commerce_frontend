import queryString from 'query-string';
import { ProductBaseUrl } from '../../../utils/uri/productUri';

export async function getProductsByQuery(signal:any, query:any) {
  try {
    const response = await fetch(`${ProductBaseUrl(`list?${queryString.stringify(query)}`)}`, {
      method: 'GET',
      credentials: 'include',
      signal,
    });
    return await response.json();
  } catch (errors) {
    console.log(errors);
  }
}

export async function getInitialProducts(category:any, signal:any) {
  try {
    const response = await fetch(`${ProductBaseUrl(`list?page=1&category=${category}`)}`, {
      method: 'GET',
      credentials: 'include',
      signal,
    });
    return await response.json();
  } catch (errors) {
    console.log(errors);
  }
}
