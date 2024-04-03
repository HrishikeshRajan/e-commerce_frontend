/* eslint-disable import/no-cycle */
import { Promo } from '@/types/Promo';
import { ClientFlashSale } from '@/types/Sale';

export type OfferProps = {
  coupons: Promo[];
  vouchers?: Promo[];
  flashsale?: ClientFlashSale;
  clearance?: Promo[];

};
