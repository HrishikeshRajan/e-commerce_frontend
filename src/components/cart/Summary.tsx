/* eslint-disable max-len */
import { ClientCart } from '@/types/Cart';
import { formattedAmount } from '@/utils/convertToRupees';
import LineSmall from '../home/ui/LineSmall';
import CheckoutButton from './CheckoutButton';

function Summary({ summary }:{ summary:ClientCart }) {
  return (
    <div className="lg:w-5/12 w-full shadow-sm rounded-xl border mt-10 p-3 h-fit lg:mt-40  ">
      <h1 className="text-slate-900 font-bold text-lg py-3">Order Summary</h1>
      <LineSmall />

      <h3 className="font-normal text-slate-800">
        <span className="text-blue-500 space-x-2 flex text-base">Tax included</span>
        <span className="text-base"> Total  Amount: &nbsp;</span>
        <span>
          {formattedAmount(summary.grandTotalPrice)}
        </span>
      </h3>
      <CheckoutButton summary={summary} />
    </div>
  );
}

export default Summary;
