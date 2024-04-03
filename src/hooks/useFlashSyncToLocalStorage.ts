import { useEffect } from 'react';
import { setToLocalStorage } from '@/utils/localstorage.helper';
import { useTypedDispatch, useTypedSelector } from './user/reduxHooks';

const useFlashSyncToLocalStorage = () => {
  const dispatch = useTypedDispatch();
  const flash = useTypedSelector((store) => store.app.flashSaleItem);
  useEffect(() => {
    setToLocalStorage('flash', flash);
  }, [dispatch, flash]);
};

export default useFlashSyncToLocalStorage;
