import { IoShirtSharp } from 'react-icons/io5';
import { BsShopWindow } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import PageWaiting from '@/utils/animations/PageWaiting';
import ServiceUnavailable from '@/components/error/ServiceUnavailable';
import MenuCard from '../ui/cards/MenuCard';

const getCounts = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/seller/estimateCount`, { credentials: 'include' });
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

function Main() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<{
    shopsCount: number;
    totalProducts: number;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const counts = await getCounts();
        setData(counts.message);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    if (!data) {
      fetchData();
    }
  }, [data]);

  if (loading) {
    return <PageWaiting loading={loading} />;
  }

  if (error) {
    return (
      <ServiceUnavailable />
    );
  }

  if (!data) {
    return null;
  }

  //
  return (
    <div className="flex flex-wrap mt-36 lg:mt-20 container  flex-col xl:flex-row  justify-center gap-2 p-5">

      <MenuCard>
        <IoShirtSharp size={40} className="text-slate-400 " />
        <div className="flex flex-col font-semibold text-slate-700">
          <p>

            Total Products

          </p>
          <p>
            {data?.totalProducts}
          </p>
        </div>
      </MenuCard>
      <MenuCard>
        <BsShopWindow size={40} className="text-slate-400 " />
        <div className="flex flex-col font-semibold text-slate-700">
          <p>

            Total Shops

          </p>
          <p>
            {data?.shopsCount}
          </p>
        </div>
      </MenuCard>

    </div>
  );
}

export default Main;
