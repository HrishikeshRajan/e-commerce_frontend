import Loading from '@/utils/animations/Loading';
import React from 'react';

function PayNowBtn({ loading }:{ loading:boolean }) {
  return (
    <button type="submit" className="w-full m-0 fixed rounded bottom-0 lg:static lg:bottom-auto disabled:bg-slate-400 outline-none bg-cyan-600 text-slate-50 shadow-sm   px-2 py-3 mt-5 font-bold" disabled={!!loading}>
      {loading ? (
        <>
          <span className="mx-2">Paying</span>
          <Loading />
        </>
      ) : 'PAY NOW'}
    </button>
  );
}

export default PayNowBtn;
