import useFlashSale from '@/hooks/useFlashSale';
import Loading from '@/utils/animations/Loading';
import { isEmpty } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import small from '@/assets/flashSmall.png';

function saleStatus(startTime:Date, endTime:Date):string | null {
  const currentDate = new Date().toString();
  const startDate = new Date(startTime).toString();
  const endDate = new Date(endTime).toString();
  if (currentDate < startDate) {
    return 'pending';
  } if (startDate < currentDate && currentDate < endDate) {
    return 'active';
  } if (startDate < currentDate && currentDate > endDate) {
    return 'expired';
  }
  return null;
}

function FormatDate({ time, label }:{ time:number | string, label:string }) {
  return (
    <span className="text-slate-600 flex flex-col text-center lg:border-2 w-10 lg:w-20 rounded-xl">
      <span className="font-semibold text-[.9rem] sm:text-2xl  ">
        { time.toString().padStart(2, '0')}
      </span>
      <span className="text-[.5rem] lg:text-lg  font-extralight">{label}</span>
    </span>
  );
}

function FlashSale() {
  const [days, setDays] = useState<number>();
  const [hours, setHours] = useState<number>();
  const [mins, setMins] = useState<number>();
  const [secs, setSecs] = useState<number>();
  const [expired, setExpired] = useState(false);

  const timer = useRef<NodeJS.Timeout | null>(null);

  const setTimer = (startDate:Date) :null => {
    const date = new Date(startDate).getTime();
    timer.current = setInterval(() => {
      const now = new Date().getTime();
      const distance = date - now;

      if (distance <= 0) {
        if (timer.current) {
          setExpired(!expired);
          clearInterval(timer.current);
        }
        return;
      }
      const numDays = Math.floor(distance / (1000 * 60 * 60 * 24));
      const numHours = Math.floor(((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      const numMins = Math.floor(((distance % (1000 * 60 * 60)) / (1000 * 60)));
      const numSecs = Math.floor(((distance % (1000 * 60)) / (1000)));

      setDays(numDays);
      setHours(numHours);
      setMins(numMins);
      setSecs(numSecs);
    }, 1000);
    return null;
  };

  const [sale, loading, isError] = useFlashSale();
  useEffect(() => {
    if (isEmpty(sale)) return;
    const currentDate = new Date().toString();
    const startDate = new Date(sale.startTime).toString();
    const endDate = new Date(sale.endTime).toString();

    if (startDate > currentDate) {
      setTimer(sale?.startTime);
    } else if (
      currentDate >= startDate
    && currentDate <= endDate) {
      setTimer(sale?.endTime);
    }
    return () => clearInterval(timer.current!);
  });

  if (loading) {
    return <Loading />;
  }
  if (isError.error) return null;
  if (isEmpty(sale)) return null;
  if (new Date().toString() > new Date(sale.endTime).toString()) {
    return;
  }

  if ((days || hours || mins || secs) === undefined) return null;
  return (
    <Link to={`flashsale/${sale._id}}/product/${sale.product._id}`}>
      <div className="p-1 mt-24 md:mt-28 relative ">
        <picture>
          <source media="(min-width: 768px)" className="w-full h-fit xl:scale-90 object-cover " srcSet={sale.banner.secure_url} />
          <source media="(max-width: 768px)" srcSet={small} />
          <img src={sale.banner.secure_url} className="w-full h-fit xl:scale-90 object-cover " alt="flashsale" />
        </picture>

        <div className="absolute  w-full  text-slate-600 flex-col   items-center justify-center text-xs xl:text-5xl top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/4 font-light flex gap-1">
          <p className="flex items-center  text-[.7rem] lg:text-lg">{ saleStatus(sale.startTime, sale.endTime) === 'active' ? <span>Sale ends  in</span> : <span>Sale starts in</span>}</p>
          <div className="flex mb-20 items-center gap-1">
            {days ? <FormatDate time={days} label="DAYS" /> : <FormatDate time="00" label="DAYS" />}
            {' '}
            :
            {hours ? <FormatDate time={hours} label="HOURS" /> : <FormatDate time="00" label="HOURS" />}
            {' '}
            :
            {mins ? <FormatDate time={mins} label="MINS" /> : <FormatDate time="00" label="MINS" />}
            {' '}
            :
            {secs ? <FormatDate time={secs} label="SECS" /> : <FormatDate time="00" label="SECS" />}
          </div>
        </div>

      </div>
    </Link>
  );
}
export default FlashSale;
