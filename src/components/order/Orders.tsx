import useOrders from '@/hooks/useOrders';
import Loading from '@/utils/animations/Loading';
import { useTypedSelector } from '@/hooks/user/reduxHooks';
import { v4 as uuidV4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import Order from './Order';

function Orders() {
  const { loading } = useOrders();
  const navigate = useNavigate();
  const orders = useTypedSelector((store) => store.order.myOrders);
  if (loading) return <Loading />;

  return (
    <div className="lg:container w-full bg-white flex justify-center ">
      <div className="w-full  px-2 lg:w-8/12 mt-20 lg:p-5 rounded">
        <h2 className="text-3xl font-bold text-slate-600 py-5">My Orders</h2>
        <div className="w-full  items-center  gap-2  flex flex-col">
          {orders && orders.length > 0
            ? orders.map((order) => {
              if (!order.cartId) return;
              return (
                <Order cartItem={order} key={uuidV4()} />
              );
            }) : (
              <div className="w-full items-center flex gap-2 justify-center flex-col">
                <p className="p-2 bg-slate-50 w-full rounded-xl">No orders found</p>
                <button type="button" onClick={() => navigate('/')} className="w-20 h-10 rounded-sm bg-yellow-400">Go home</button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default Orders;
