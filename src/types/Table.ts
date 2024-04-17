import { IUser } from '@/components/user';
import { IAddress } from './User';

interface TProductImage {
  url: string;
  secure_url: string;
  _id: string;
}

interface TProduct {
  name: string;
  description: string;
  category: string;
  price: number;
  currencyCode: string;
  brand: string;
  color: string;
  sizes: string[];
  stock: number;
  images: TProductImage[];
  ratings: number;
  numberOfReviews: number;
  sellerId: string;
  shopId: string;
  gender: string;
  isDiscontinued: boolean;
  keywords: string[];
  productId: string;
}

export interface TOrder {
  qty: number;
  options: {
    color: string;
    size: string;
  };
  totalPrice: number;
  orderStatus: string;
  gstInPercentage: number;
  taxAmount: number;
  totalPriceBeforeTax: number;
  totalPriceAfterTax: number;
  totalPriceAfterTaxString: string;
  product: TProduct;
  orderId: string;
  cartId:string
  shippingAddress:IAddress
  orderDate:string
  customerId:Pick<IUser, '_id' | 'email' | 'fullname'>
  paymentDetails: {
    status: string
    paidAmount: number
    paymentId: string
  }
}
