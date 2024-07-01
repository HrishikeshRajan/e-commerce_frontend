import { useEffect, useState } from 'react';
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
    <div className="relative max-w-[11rem] m-0 bg-slate-300">
      {copied && <span className="px-2 border-2 bg-white border-black absolute w-full right-0 left-0 -top-0 text-center  z-40">Copied</span>}
      <button type="button" onClick={handleCode} disabled={expired} className={` ${expired ? 'cursor-not-allowed' : 'cursor-pointer'} w-full lg:w-full relative `}>
        <img src={coupon.banner.secure_url} className=" w-full " alt="coupon" />
        <div className="bg-white text-black mx-auto border-2 border-dashed w-full border-black  text-center">{coupon.code}</div>
      </button>
    </div>

  );
}

export default Coupon;
