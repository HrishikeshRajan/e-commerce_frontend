/* eslint-disable no-await-in-loop */
import { CART } from '@/utils/API';
import axios, { AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';

export const deleteCartItemByIds = async (
  productId:string,
  cartId:string,
  maxRetries = 5,
): Promise<any> => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  let retries = 0;

  while (retries < maxRetries) {
    try {
      const response = await CART.delete(`products/${productId}/carts/${cartId}`, { withCredentials: true });

      if (response.status >= 200 && response.status < 300) {
        return response;
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status !== StatusCodes.UNAUTHORIZED) {
          console.error(`Server responded with status ${axiosError.response?.status}: ${axiosError.response?.data}`);
        } else if (axiosError.response?.status === StatusCodes.UNAUTHORIZED) {
          throw error;
        } else if (axiosError.request) {
          console.error(`No response received from the server. Request made: ${axiosError.request}`);
        } else {
          console.error(`Error setting up request: ${axiosError.message}`);
        }
      } else {
        console.error(`An unexpected error occurred: ${error.message}`);
      }

      retries += 1;

      if (retries >= maxRetries) {
        console.error(`Max retries (${maxRetries}) reached. Cannot delete cart.`);
        throw error;
      }

      console.log(`Retrying after error (Retry ${retries})...`);
      await new Promise((resolve) => { setTimeout(resolve, 2000); });
    }
  }
};
