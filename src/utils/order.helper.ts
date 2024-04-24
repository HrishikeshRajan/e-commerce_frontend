import { Address, ClientOrder } from '@/types/Orders';

const orderHelper = {
  addOrder: (order:Partial<ClientOrder>) => {
    try {
      if (typeof window === 'undefined') return;
      localStorage.setItem('order', JSON.stringify(order));
    } catch (error) {
      console.log(error);
    }
  },
  setShippingAddress: (address:Address) => {
    try {
      if (typeof window === 'undefined') return;
      const order = localStorage.getItem('order');
      if (order) {
        const parsedOrder = JSON.parse(order) as ClientOrder;
        parsedOrder.shippingAddress = address;
        localStorage.setItem('order', JSON.stringify(parsedOrder));
      }
    } catch (error) {
      console.log(error);
    }
  },
  addOrderId: (orderId:string) => {
    try {
      if (typeof window === 'undefined') return;
      localStorage.setItem('orderId', JSON.stringify(orderId));
    } catch (error) {
      console.log(error);
    }
  },
  getOrderId: () => {
    try {
      if (typeof window === 'undefined') return;
      const orderId = localStorage.getItem('orderId');
      if (!orderId) return;
      return JSON.parse(orderId) || null;
    } catch (error) {
      console.log(error);
    }
  },
  getOrder: () => {
    try {
      if (typeof window === 'undefined') return;
      const order = localStorage.getItem('order');
      if (!order) {
        return null;
      }
      return JSON.parse(order) || null;
    } catch (error) {
      console.log(error);
    }
  },
  clearOrderId: () => {
    try {
      if (typeof window === 'undefined') return;
      localStorage.removeItem('orderId');
    } catch (error) {
      console.log(error);
    }
  },
  clearOrder: () => {
    try {
      if (typeof window === 'undefined') return;
      localStorage.removeItem('order');
    } catch (error) {
      console.log(error);
    }
  },
};

export default orderHelper;
