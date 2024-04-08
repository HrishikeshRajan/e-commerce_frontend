import { RefObject, useEffect } from 'react';

const useOutsideClickListner = <T extends HTMLElement>(ref: RefObject<T>[],
  fn:(e: MouseEvent) => void) => {
  useEffect(() => {
    window.addEventListener('click', fn);
    return () => {
      window.removeEventListener('click', fn);
    };
  }, [ref, fn]);
};

export default useOutsideClickListner;
