/* eslint-disable security/detect-object-injection */
/* eslint-disable import/no-cycle */
import { ProductBaseUrl } from '../../../../urlConstants';
import { IProduct } from '../types';

export interface FileTypes {
  files?:any
}
export type Product = IProduct & FileTypes;
export const createNewProduct = async (product:Omit<Product, 'id' | 'price' | 'stock' | 'keywords'> & { price:string, stock:string }) => {
  try {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', JSON.stringify(product.price));
    formData.append('currencyCode', product.currencyCode);
    formData.append('description', product.description);
    formData.append('category', product.category);
    formData.append('brand', product.brand);
    formData.append('color', product.color);
    formData.append('gender', product.gender);
    formData.append('shopId', product.shopId);
    formData.append('stock', JSON.stringify(product.stock));
    formData.append('isDiscontinued', JSON.stringify(product.isDiscontinued));

    for (let i = 0; i < product.files.images.length; i += 1) {
      formData.append('images', product.files.images[i]);
    }

    const sizes = product.sizes.split(',');

    for (let i = 0; i < sizes.length; i += 1) {
      formData.append('sizes', sizes[i]);
    }

    const response = await fetch(`${ProductBaseUrl('/')}`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Something went wrong! try again later.');
    }
  }
};
