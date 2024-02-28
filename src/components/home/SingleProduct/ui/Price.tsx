import { formattedAmount } from '@/utils/convertToRupees';
import React from 'react';

function Price({ price }:{ price:number }) {
  return (
    <p className="font-bold text-lg">{formattedAmount(price)}</p>
  );
}

export default Price;