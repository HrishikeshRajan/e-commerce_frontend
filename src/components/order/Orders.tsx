import useOrders from '@/hooks/useOrders';
import Loading from '@/utils/animations/Loading';
import React from 'react';
import OrderCard from './OrderCard';

function Orders() {
  const { orders, loading } = useOrders();

  if (loading) return <Loading />;
  return (
    <div className="lg:container w-full bg-[#F0FFF0] flex justify-center ">
      <div className="w-full  px-2 lg:w-8/12 mt-20 lg:p-5 rounded">
        <h2 className="text-3xl font-bold text-slate-600 py-5">My Orders</h2>
        <div className="w-full gap-2 flex flex-col">
          {orders
           && orders.map((order) => (
             <OrderCard
               order={order.cartId}
               cartId={order.cartId._id}
               key={order._id}
             />
           ))}
        </div>
      </div>
    </div>
  );
}

export default Orders;
