import { ProductUser } from '@/components/products/types';
import { getUrl } from '@/utils/getUrl';
import { useEffect, useState } from 'react';

const useLatestProducts = () => {
  const [products, setProducts] = useState<ProductUser[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${getUrl(import.meta.env.VITE_BASE_URL, '/api/v1/product/home')}/latest`,
          {
            headers: {
              Accept: 'application/json',
            },
          },
        );
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('401');
          }
        }
        const result = await response.json();

        setProducts(result.message.products);
      } catch (err) {
        if (err instanceof Error) {
          setError(true);
        }
      } finally {
        setLoading(false);
        setError(false);
      }
    };

    fetchLatestProducts();
  }, []);

  return { products, loading, error };
};

export default useLatestProducts;
