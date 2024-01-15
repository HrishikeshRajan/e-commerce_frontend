import { useEffect } from 'react';

const useScroll = (handleScroll: () => Promise<void>) => {
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);
};

export default useScroll;
