import React, { useEffect, useState } from 'react';
import { Promo } from '@/types/Promo';

function Coupon({ coupon }:{ coupon:Promo }) {
  const [expired] = useState(() => {
    const current = new Date().toString();
    if (current > new Date(coupon.endTime).toString()) {
      return true;
    }
    return false;
  });

  const [copied, setCopied] = useState('');

  useEffect(() => {
    let timer:any;
    if (copied) {
      setTimeout(() => setCopied(''), 1000);
    }

    return () => clearTimeout(timer);
  }, [copied]);
  const handleCode = async () => {
    navigator.clipboard.writeText(coupon.code);
    navigator.clipboard.readText().then(() => {
      setCopied('Copied');
    }).catch(() => setCopied('Copying failed. Do it manually'));
  };
  return (
    <div className="relative w-32">
      {copied && <span className="px-2 border-2 bg-white border-slate-200 absolute -top-10 z-10">{copied}</span>}
      <button type="button" onClick={handleCode} disabled={expired} className={` ${expired ? 'cursor-not-allowed' : 'cursor-pointer'} w-32 relative `}>
        <img src={coupon.banner.secure_url} className="rounded-xl" alt="coupon" />
        <span className="bg-white text-black mx-auto border-2 border-dashed absolute top-0 left-0 right-0 border-black  text-center">{coupon.code}</span>
      </button>
    </div>

  );
}

export default Coupon;
