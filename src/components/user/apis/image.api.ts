const imageUploadHeaders = new Headers();
imageUploadHeaders.set('Accept', 'application/json');
imageUploadHeaders.set('Content-Type', 'image/png');

export const uploadImage = async function uploadImage(form: FormData) {
  try {
    const url = `${import.meta.env.VITE_BASE_URL}/api/v1/users/profile-picture`;
    const response = await fetch(url, {
      method: 'PUT',
      credentials: 'include',
      body: form,
      headers: imageUploadHeaders,
    });
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Something went wrong. Please try again later.');
    } else {
      throw new Error('Something went wrong.');
    }
  }
};

/**
 * To delete the profile picture
 */
const headers = new Headers();
headers.set('Accept', 'application/json');
headers.set('Content-Type', 'application/json');

export const deleteImage = async function deleteImage() {
  try {
    const url = `${import.meta.env.VITE_BASE_URL}/profile-picture`;
    const response = await fetch(url, {
      method: 'DELETE',
      credentials: 'include',
      headers,
    });
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Something went wrong. Please try again later.');
    } else {
      throw new Error('Something went wrong.');
    }
  }
};
