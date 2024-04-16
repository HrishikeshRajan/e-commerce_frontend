import { useTypedDispatch } from '@/hooks/user/reduxHooks';
import { clearProducts } from '@/utils/reduxSlice/productSlice';
import { Link, useSearchParams } from 'react-router-dom';

function Logo() {
  const dispatch = useTypedDispatch();
  const [search, setSearch] = useSearchParams();

  const clearSearch = () => {
    if (search.get('name')) {
      search.delete('name');
      setSearch(search);
    }
    dispatch(clearProducts());
  };
  return (
    <Link to="/" className="hidden xl:block" onClick={clearSearch}>
      <img
        src={import.meta.env.VITE_COMPANY_LOGO}
        alt="Logo"
        width={80}
        height={80}
        className="w-20 h-20 object-cover cursor-pointer rounded-full "
      />
    </Link>
  );
}

export default Logo;
