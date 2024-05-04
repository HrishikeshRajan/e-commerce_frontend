import useFlashSale from '@/hooks/useFlashSale';
import Loading from '@/utils/animations/Loading';
import { isEmpty } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function saleStatus(startTime:Date, endTime:Date):string | null {
  const currentDate = new Date();
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);
  if (currentDate < startDate) {
    return 'PENDING';
  } if (startDate < currentDate && currentDate < endDate) {
    return 'ACTIVE';
  } if (startDate < currentDate && currentDate > endDate) {
    return 'EXPIRED';
  }
  return null;
}

function FormatDate({ time, label }:{ time:number | string, label:string }) {
  return (
    <span className="text-white flex flex-col text-center border-white lg:border-2 w-10 lg:w-20 rounded-xl">
      <span className="font-semibold text-[.9rem] sm:text-2xl  ">
        { time.toString().padStart(2, '0')}
      </span>
      <span className="text-[.5rem] lg:text-lg  font-extralight">{label}</span>
    </span>
  );
}

function FlashSaleBanner() {
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

    const currentDate = new Date();
    const startDate = new Date(sale.startTime);
    const endDate = new Date(sale.endTime);
    if (startDate > currentDate) {
      setTimer(sale?.startTime);
    } else if (
      currentDate >= startDate
    && currentDate <= endDate) {
      setTimer(sale?.endTime);
    }
    return () => clearInterval(timer.current!);
  });

  if (loading || (!sale) || (isEmpty(sale))) {
    return <div className="w-full h-96 bg-slate-200"><Loading /></div>;
  }
  if (isError.error) return null;
  if (new Date() > new Date(sale.endTime)) {
    return;
  }
  return (
    <Link to={`flashsale/${sale._id}}/product/${sale.product}`} className="p-1 flex flex-col justify-center items-center top-full mt-20 h-fit relative bg-black">
      <p className="text-white font-extrabold text-base lg:text-lg mt-5 xl:mt-10">{sale.name}</p>
      <div className="p-1  relative flex flex-col  justify-center">
        <p className="flex items-center    text-[.7rem] justify-center lg:text-lg text-white p-5 font-semibold">{ saleStatus(sale.startTime, sale.endTime) === 'ACTIVE' ? <span>Sale ends  in</span> : <span>Sale starts in</span>}</p>
        <div className="flex justify-center  items-center xl:mb-20 mb-5  gap-1  ">
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
    </Link>
  );
}
export default FlashSaleBanner;
