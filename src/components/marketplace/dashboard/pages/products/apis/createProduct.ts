/* eslint-disable security/detect-object-injection */
/* eslint-disable import/no-cycle */
import { ProductBaseUrl } from '../../../../urlConstants';
import { Product } from '../../../ui/forms/AddProductForm';

export interface FileTypes {
  files?:any
}
export type IProduct = Product & FileTypes;
export const createNewProduct = async (product:IProduct) => {
  try {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('currencyCode', product.currencyCode);
    formData.append('description', product.description);
    formData.append('category', product.category);
    formData.append('brand', product.brand);
    formData.append('sizes', product.sizes);
    formData.append('color', product.color);
    formData.append('gender', product.gender);
    formData.append('isDiscontinued', product.isDiscontinued);
    formData.append('keywords', product.keywords);

    for (let i = 0; i < product.files.images.length; i += 1) {
      formData.append('images', product.files.images[i]);
    }

    const response = await fetch(`${ProductBaseUrl('/')}`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
