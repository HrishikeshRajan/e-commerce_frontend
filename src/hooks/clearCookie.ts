import AuthHelper from '@/components/auth/apis/helper';
import { useEffect, useState } from 'react';

const useClearCookie = <S, D>(key:S) => {
  const [storedVal] = useState <D>(() => {
    if (typeof window === 'undefined') {
      return null;
    }
    try {
      const item = localStorage.getItem(key as string);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      return null;
    }
  });
  useEffect(() => {
    if (!storedVal) {
      AuthHelper.clearSignedOnData();
    }
  }, [storedVal]);
};

export default useClearCookie;
