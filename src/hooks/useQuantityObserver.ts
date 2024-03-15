
import { useEffect, useState } from 'react';

/**
 * Custom hook to observe changes in quantity and trigger animations.
 * @param qty - Quantity value to observe.
 * @returns A boolean indicating whether an animation should be triggered.
 */
const useQuantityObserver = (qty:number) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  useEffect(() => {
    if (qty) {
      setShouldAnimate(true);
      const timeoutId = setTimeout(() => setShouldAnimate(false), 500);
      return () => clearTimeout(timeoutId);
    }
  }, [qty]);
  return shouldAnimate;
};

export default useQuantityObserver;
