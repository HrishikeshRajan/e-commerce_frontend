import queryString from 'query-string';
import { ProductQuery } from '@/utils/reduxSlice/productSlice';
import { ProductBaseUrl } from '../../../utils/uri/productUri';

export async function getProductsByQuery(
  query:ProductQuery,
  signal: AbortSignal,
) {
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
