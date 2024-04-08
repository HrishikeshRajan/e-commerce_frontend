import { clearProducts } from '@/utils/reduxSlice/productSlice';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTypedDispatch } from './user/reduxHooks';

const useSyncSearchWithSearchParams = (word:string) => {
  const dispatch = useTypedDispatch();
  const [search, setSearch] = useSearchParams();
  useEffect(() => {
    if (!search.get('name')) {
      search.delete('name');
      setSearch(search);
      dispatch(clearProducts());
    }
    if (search.get('name')) {
      search.set('name', word);
      setSearch(search);
    }
  }, [dispatch, search, setSearch, word]);
};

export default useSyncSearchWithSearchParams;
