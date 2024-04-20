/* eslint-disable import/no-cycle */

type IShop = {
  name: string;
  description: string;
  address: string;
  email: string;
};
export const updateShop = async (shop:IShop, shopId:string) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/seller/shop/${shopId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(shop),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

// Function to convert Cloudinary image URL to Data URL
export async function convertCloudinaryToDataUrl(cloudinaryImageUrl:string) {
  try {
    const response = await fetch(cloudinaryImageUrl);
    const blob = await response.blob();

    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error converting Cloudinary image to Data URL:', error);
    return null;
  }
}
