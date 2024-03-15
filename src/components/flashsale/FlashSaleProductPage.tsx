import React from 'react';
import useFlashSale from '@/hooks/useFlashSale';
import { formattedAmount } from '@/utils/convertToRupees';
import cart from '@/utils/cart.helper';
import SingleProduct from '../home/SingleProduct/SingleProduct';
import Button from '../auth/ui/Button';

function FlashSale() {
  const [sale, loading, isError] = useFlashSale();

  if (loading) return;
  if (isError.error) return;
  if (!sale) return;
  const handleRequest = () => {
    cart.addToCartFlash(sale.product, { color: 'red', size: 'xl' }, sale);
  };
  return (
    <div className="w-full flex mt-10 justify-center container">
      <SingleProduct product={sale.product} discount={sale.priceAfterDiscount}>

        {sale && new Date().toString() < new Date(sale?.startTime).toString() && (
          <>
            <h1 className="text-3xl text-slate-900 animate-pulse font-semibold">COMMING SOON</h1>
            <Button
              mode="idle"
              className="mt-5 mb-5 w-full  rounded-lg bg-orange-600 p-3 text-xl font-bold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              type="button"
              disabled={false}
            >
              NOTIFY ME
            </Button>
          </>
        )}

        {sale && new Date().toString() >= new Date(sale?.startTime).toString()
        && new Date().toString() <= new Date(sale?.endTime).toString() && (
          <Button
            mode="idle"
            className="mt-5 mb-5  rounded-lg bg-orange-600 p-3 text-xl font-bold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="button"
            disabled={false}
            onClick={handleRequest}
          >
            BUY for &nbsp;

            {sale && formattedAmount(sale.priceAfterDiscount!)}

          </Button>
        )}
        {/* <AddToCartButton path="api/v1/flashsale/cart" /> */}

      </SingleProduct>
    </div>
  );
}

export default FlashSale;
