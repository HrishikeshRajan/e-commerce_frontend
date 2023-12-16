import { useEffect } from 'react';
import { toggleSidebar } from '@/utils/reduxSlice/appSlice';
import { useTypedDispatch } from './reduxHooks';

/**
 * Close the sidebar when component unmounds
 */
const useCloseSidebar = () => {
  const dispatch = useTypedDispatch();
  useEffect(() => () => {
    dispatch(toggleSidebar());
  }, []);
};

export default useCloseSidebar;
