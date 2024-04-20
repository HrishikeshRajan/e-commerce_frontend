import { ShopBaseUrl } from '../../../../urlConstants';

export const uploadImage = async function uploadImage(form: FormData) {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/seller/logo`, {
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
