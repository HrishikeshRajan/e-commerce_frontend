/* eslint-disable react/jsx-props-no-spreading */
import React, {
  useCallback, useRef, useState,
} from 'react';

import { useParams } from 'react-router-dom';
import useProductsQuery from '@/hooks/user/useProductsQuery';
import Loading from '@/utils/animations/Loading';
import ProductNotFoundError from './ProductNotFoundError';
import Card from './Card';

function ProductCardsWrapper() {
  const params = useParams();
  const observer = useRef<any>(null);
  const [queryObj] = useState<Record<string, string | number>>({
    category: params.category!,
  });

  const [page, setPage] = useState(1);

  const {
    products, loading, hasMore, error,
  } = useProductsQuery(queryObj, page);

  const lastCardCurrentPage = useCallback((card: any) => {
    if (loading) return;

    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries:any) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((pageNo) => (pageNo + 1));
      }
    });

    if (card) { observer.current.observe(card); }
  }, [loading, hasMore]);

  if (!products || (products && products.length < 1) || error) {
    return (
      <div className="w-full flex absolute  bg-red-20 h-screen  mt-28">
        <ProductNotFoundError category={params.category!} />
      </div>
    );
  }
  return (
    <div className="w-full flex absolute  bg-red-20 h-screen  mt-28">
      <div className="w-full">
        {products && (
          <div className="w-full flex flex-wrap md:gap-2 lg:p-2 justify-center">
            {products.map((item, index) => {
              if (products.length === index + 1) {
                return <Card ref={lastCardCurrentPage} key={item._id} {...item} />;
              }
              return <Card key={item._id} {...item} />;
            })}
          </div>
        )}
        <div className="w-full flex justify-center">
          {loading && <Loading />}
          {!hasMore && <Loading />}
        </div>
      </div>
    </div>
  );
}

export default ProductCardsWrapper;
