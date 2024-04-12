import React, { useEffect, useState } from 'react';
import { Promo } from '@/types/Promo';

function Coupon({ coupon }:{ coupon:Promo }) {
  const [expired] = useState(() => {
    if (coupon.status === 'EXPIRED') {
      return true;
    }
    return false;
  });

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let timer:any;
    if (copied) {
      setTimeout(() => setCopied(false), 1000);
    }

    return () => clearTimeout(timer);
  }, [copied]);
  const handleCode = async () => {
    navigator.clipboard.writeText(coupon.code);
    navigator.clipboard.readText().then(() => {
      setCopied(true);
    }).catch(() => setCopied(false));
  };

  return (
    <div className="relative w-32">
      {copied && <span className="px-2 border-2 bg-white border-black absolute right-0 left-0 -top-0 text-center  z-40">Copied</span>}
      <button type="button" onClick={handleCode} disabled={expired} className={` ${expired ? 'cursor-not-allowed' : 'cursor-pointer'} w-32 relative `}>
        <img src={coupon.banner.secure_url} className="rounded-xl" alt="coupon" />
        <span className="bg-white text-black mx-auto border-2 border-dashed absolute top-0 left-0 right-0 border-black  text-center">{coupon.code}</span>
      </button>
    </div>

  );
}

export default Coupon;
