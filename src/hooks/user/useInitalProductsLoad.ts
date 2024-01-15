import { getInitialProducts } from '@/components/products/apis/getProducts';
import { addProducts, addProductsMeta } from '@/utils/reduxSlice/productSlice';
import { useEffect } from 'react';
import { useTypedDispatch, useTypedSelector } from './reduxHooks';

const useInitialProductsLoad = (category:string) => {
  const dispatch = useTypedDispatch();
  const products = useTypedSelector((store) => store.products.userProducts);
  // Initial Load
  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    if ((products.length < 1)
        || (products.length > 1 && products[0].category !== category)) {
      getInitialProducts(category, signal).then((response) => {
        if (response && response.statusCode === 200
           && response.message.products
           && response.message.products.length > 1) {
          dispatch(addProducts(response.message.products));
          dispatch(addProductsMeta({
            itemsShowing: response.message.itemsShowing,
            totalItems: response.message.totalItems,
          }));
        } else if (response && response.statusCode === 404) {
          console.log('product not found');
        }
      });
    }
    return () => {
      abortController.abort();
    };
  }, [dispatch, category, products]);
};

export default useInitialProductsLoad;
