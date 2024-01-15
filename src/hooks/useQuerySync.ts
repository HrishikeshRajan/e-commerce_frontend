import { useEffect } from 'react';
import { addProductQuery } from '@/utils/reduxSlice/productSlice';
import { useTypedDispatch } from './user/reduxHooks';

const useQuerySync = (queryObj:any) => {
  const dispatch = useTypedDispatch();
  useEffect(() => {
    dispatch(addProductQuery(queryObj));
  }, [dispatch, queryObj]);
};

export default useQuerySync;
