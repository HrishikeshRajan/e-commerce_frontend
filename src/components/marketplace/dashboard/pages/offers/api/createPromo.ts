/**
 * @author Hrishikesh Rajan
 * Create promo method
 *
 */

import { PromoUpload } from '@/types/Promo';

const createDate = (date:string) => {
  const parsedTime = date.split('T');
  const finalDate = new Date(`${parsedTime[0]} ${parsedTime[1]}`);
  return finalDate;
};
export const createPromo = async (formData:Partial<PromoUpload>) => {
  //  Request headers
  const headers = new Headers();
  headers.set('Accept', 'application/json');
  headers.set('Content-Type', 'application/json');

  const form = new FormData();
  const Tags:{ products:string[] } = { products: [] };
  formData.tags?.products.forEach((productId) => {
    Tags.products.push(productId);
  });
  form.append('offername', formData.offername!);
  form.append('image', formData.image!);
  form.append('type', formData.type!);
  form.append('method', formData.method!);
  form.append('startTime', JSON.stringify(createDate(formData.startTime!)));
  form.append('endTime', JSON.stringify(createDate(formData.endTime!)));
  form.append('code', formData.code!);
  if (formData.type === 'PERCENTAGE') {
    form.append('discountPercentage', String(formData.discountPercentage!));
  }
  if (formData.type === 'FLAT') {
    form.append('discountAmount', String(formData.discountAmount!));
  }
  form.append('maxUsage', formData.maxUsage?.toString() || '');
  form.append('maxUsagePerUser', formData.maxUsagePerUser?.toString() || '');
  formData.usedBy?.forEach((usedByItem, index) => {
    form.append(`usedBy[${index}].userId`, usedByItem.userId);
    form.append(`usedBy[${index}].count`, usedByItem.count.toString());
  });
  form.append('minAmountInCart', formData.minAmountInCart?.toString() || '');
  form.append('tags', JSON.stringify(Tags));
  form.append('status', formData.status!);

  try {
    const data = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/seller/promo`, {
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
