import { baseURL } from '../../auth/apis/constants';

export const uploadImage = async function uploadImage(form: FormData) {
  try {
    const response = await fetch(`${baseURL()}/profile-picture`, {
      method: 'PUT',
      credentials: 'include',
      body: form,
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const deleteImage = async function deleteImage() {
  try {
    const response = await fetch(`${baseURL()}/profile-picture`, {
      method: 'DELETE',
      credentials: 'include',
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
