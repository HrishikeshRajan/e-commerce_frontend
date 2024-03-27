/* eslint-disable import/no-cycle */
import { Promo } from '@/types/Promo';
import { IFlashSale } from '@/types/Sale';

export type OfferProps = {
  coupons: Promo[];
  vouchers?: Promo[];
  flashsale?: IFlashSale;
  clearance?: Promo[];

};
