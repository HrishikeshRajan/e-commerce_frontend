import { useState } from 'react';

const useLocalStorage = <S, D>(key:S) => {
  const [storedVal, setStoredVal] = useState <D>(() => {
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

  const setValue = (data:D):void => {
    try {
      setStoredVal(data);
      if (typeof window !== 'undefined') {
        localStorage.setItem(key as string, JSON.stringify(data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const clearField = (fieldName:string):void => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(fieldName);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedVal, setValue, clearField] as const;
};

export default useLocalStorage;
