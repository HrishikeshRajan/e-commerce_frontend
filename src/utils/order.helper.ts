const orderHelper = {
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
