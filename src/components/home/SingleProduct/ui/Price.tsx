import { formattedAmount } from '@/utils/convertToRupees';

function Price({ price }:{ price:number }) {
  return (
    <p className="font-semibold text-base ">{formattedAmount(price)}</p>
  );
}

export default Price;
