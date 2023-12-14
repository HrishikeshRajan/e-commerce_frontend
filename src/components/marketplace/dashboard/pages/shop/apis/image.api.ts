import { ShopBaseUrl } from '../../../../constants';

export const uploadImage = async function uploadImage(form: FormData) {
  try {
    const response = await fetch(`${ShopBaseUrl('logo')}`, {
      method: 'PUT',
      credentials: 'include',
      body: form,
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const deleteImage = async function deleteImage(shopId:string) {
  try {
    const response = await fetch(`${ShopBaseUrl('logo')}/${shopId}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
