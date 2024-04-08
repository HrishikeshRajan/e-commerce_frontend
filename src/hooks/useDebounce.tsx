import { useEffect } from 'react';

const useDebounce = (fn:(word:string) => any, time:number, itemToTrack:any) => {
  useEffect(() => {
    const timer = setTimeout(fn, time);

    return () => {
      clearTimeout(timer);
    };
  }, [fn, itemToTrack, time]);
};

export default useDebounce;
