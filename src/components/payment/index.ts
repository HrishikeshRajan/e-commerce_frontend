/**
 *  Author : Hrishikesh Rajan
 *
 *  Type predicates for stripe
 */

import { ClientOrder } from '@/types/Orders';

type PaymentProperties = {
  clientSecret: string;
  id: string;
};
export function hasPaymentProperties(
  responseProperty: PaymentProperties | undefined,
): responseProperty is PaymentProperties {
  return (
    (responseProperty as PaymentProperties).clientSecret !== undefined
    && (responseProperty as PaymentProperties).id !== undefined
  );
}

export function hasOrder(
  responseProperty: ClientOrder | undefined,
): responseProperty is ClientOrder {
  return (

    (responseProperty as ClientOrder).cartId !== undefined
    && (responseProperty as ClientOrder).orderId !== undefined
    && (responseProperty as ClientOrder).userId !== undefined
    && (responseProperty as ClientOrder).orderDetails !== undefined
    && (responseProperty as ClientOrder).shippingAddress !== undefined
    && (responseProperty as ClientOrder).paymentDetails !== undefined

  );
}
