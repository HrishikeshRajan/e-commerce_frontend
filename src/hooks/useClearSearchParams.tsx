import { clearProducts } from '@/utils/reduxSlice/productSlice';
import { useSearchParams } from 'react-router-dom';
import { useTypedDispatch } from './user/reduxHooks';

const useClearSearchParams = () => {
  const dispatch = useTypedDispatch();
  const [search, setSearch] = useSearchParams();
  if (!search.get('name')) {
    search.delete('name');
    setSearch(search);
    dispatch(clearProducts());
  }
};

export default useClearSearchParams;
