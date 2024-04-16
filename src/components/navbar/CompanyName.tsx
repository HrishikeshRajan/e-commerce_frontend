import { useTypedDispatch } from '@/hooks/user/reduxHooks';
import { clearProducts } from '@/utils/reduxSlice/productSlice';
import { Link, useSearchParams } from 'react-router-dom';

function CompanyName({ className }:{ className:string }) {
  const dispatch = useTypedDispatch();
  const [search, setSearch] = useSearchParams();

  const clearAll = () => {
    if (search.get('name')) {
      search.delete('name');
      setSearch(search);
    }
    dispatch(clearProducts());
  };
  return (
    <Link to="/" onClick={clearAll}>
      <h2 className={className}>Wondercart</h2>
    </Link>

  );
}

export default CompanyName;
