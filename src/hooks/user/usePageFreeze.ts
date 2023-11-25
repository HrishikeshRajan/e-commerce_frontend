import { useEffect } from 'react';

export const usePageFreeze = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.style.overflowY = 'hidden';
    }
    return () => {
      document.body.style.overflowY = 'scroll';
    };
  });
};
