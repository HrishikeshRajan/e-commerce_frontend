/* eslint-disable react/jsx-no-constructed-context-values */
import { GiShoppingBag } from 'react-icons/gi';
import { IconContext } from 'react-icons';
import { useTypedSelector } from '@/hooks/user/reduxHooks';
import { useNavigate } from 'react-router-dom';
import useQuantityObserver from '@/hooks/useQuantityObserver';

function CartNavIcon() {
  const qtyFromRedux = useTypedSelector((store) => store.cart.cart?.grandTotalQty) || 0;
  const navigate = useNavigate();
  const shouldAnimate = useQuantityObserver(qtyFromRedux);
  const handleNavigation = () => {
    navigate('cart');
  };
  return (
    <button onClick={handleNavigation} type="button" className="relative inline-flex items-center p-1 text-sm font-medium text-center text-white">
      <IconContext.Provider value={{ className: 'text-slate-700', size: '20' }}>
        <span>
          <GiShoppingBag />
        </span>
      </IconContext.Provider>
      <span className="sr-only">Notifications</span>
      {(qtyFromRedux) && <div className={`absolute inline-flex items-center justify-center w-5 h-5 p-2  text-xs font-bold text-whit e bg-red-500 border-2 border-white rounded-full -top-2 -end-2  ${shouldAnimate ? 'animate-bounce' : ''}`}><small>{qtyFromRedux}</small></div>}
    </button>
  );
}

export default CartNavIcon;
