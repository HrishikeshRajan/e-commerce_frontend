import { useEffect } from 'react';
import { signInPage } from '../../utils/reduxSlice/appSlice';
import { useTypedDispatch } from './reduxHooks';

/**
 * @description
 * Sets authPage to true on mount and false on unmount using Redux.
 */
const useAuthPage = () => {
  const dispatch = useTypedDispatch();
  useEffect(() => {
    dispatch(signInPage(true));
    return () => {
      dispatch(signInPage(false));
    };
  }, [dispatch]);
};

export default useAuthPage;
