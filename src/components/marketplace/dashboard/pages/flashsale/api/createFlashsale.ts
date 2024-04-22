/**
 * @author Hrishikesh Rajan
 * Create flashsale
 *
 */

import { UploadFlashSale } from '@/types/Sale';

const createDate = (date:string) => {
  const parsedTime = date.split('T');
  const finalDate = new Date(`${parsedTime[0]} ${parsedTime[1]}`);
  return finalDate;
};
export const createFlashsale = async (formData:Partial<UploadFlashSale>) => {
  //  Request headers
  const headers = new Headers();
  headers.set('Accept', 'application/json');
  headers.set('Content-Type', 'application/json');

  const form = new FormData();

  form.append('name', formData.name!);
  // form.append('image', formData.image!);
  form.append('type', formData.type!);
  form.append('method', formData.method!);
  form.append('startTime', JSON.stringify(createDate(formData.startTime!)));
  form.append('endTime', JSON.stringify(createDate(formData.endTime!)));
  form.append('totalQuantityToSell', String(formData.totalQuantityToSell!));

  if (formData.type === 'PERCENTAGE') {
    form.append('discountPercentage', String(formData.discountPercentage!));
  }
  if (formData.type === 'FLAT') {
    form.append('discountAmount', String(formData.discountAmount!));
  }

  form.append('product', formData.product!);
  form.append('status', formData.status!);
  // form.append('position', formData.position!);

  try {
    const data = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/seller/flashsale`, {
      method: 'POST',
      credentials: 'include',
      body: form,
    });
    return await data.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Something went wrong. Please try again later.');
    } else {
      throw new Error('Something went wrong.');
    }
  }
};
