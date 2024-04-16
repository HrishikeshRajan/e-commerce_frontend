/* eslint-disable @typescript-eslint/naming-convention */
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export enum ORDER_STATUS {
  NOT_PROCESSED = 'Not_processed',
  PROCESSING = 'Processing',
  SHIPPED = 'Shipped',
  CANCELED = 'CANCELED',
  DELIVERED = 'Delivered',
}

export enum NumToStatusMap {
  'N' = ORDER_STATUS.NOT_PROCESSED,
  'P' = ORDER_STATUS.PROCESSING,
  'S' = ORDER_STATUS.SHIPPED,
  'C' = ORDER_STATUS.CANCELED,
  'D' = ORDER_STATUS.DELIVERED,
}
function ShopOrderTab() {
  const [active, setActive] = useState(0);
  const TabOptions = [
    { id: 1, code: 'N', text: NumToStatusMap.N },
    { id: 2, code: 'P', text: NumToStatusMap.P },
    { id: 3, code: 'S', text: NumToStatusMap.S },
    { id: 4, code: 'D', text: NumToStatusMap.D },
    { id: 5, code: 'C', text: NumToStatusMap.C },
  ];
  const [search, setSearchParams] = useSearchParams();
  const handleTabChange = (e:string, tab:number) => {
    setActive(tab);
    search.set('filterBy', e);
    setSearchParams(search);
  };
  return (
    <div className="w-fit bg-slate-50 my-1 rounded-lg p-1 flex gap-1">
      <button
        type="button"
        onClick={() => {
          search.delete('filterBy');
          setSearchParams(search);
          setActive(0);
        }}
        className={`p-3 ${active === 0 ? ' bg-gray-900 text-white' : 'bg-white text-slate-400'} shadow-md hover:transition hover:duration-500 hover:ease-in-out hover:bg-gray-200 hover:text-gray-900   rounded-lg font-semibold transition duration-75 ease-in  active:scale-95`}
      >
        New Orders
      </button>
      {TabOptions.map((tab) => <button type="button" key={tab.id} onClick={() => handleTabChange(tab.code, tab.id)} className={`p-3 ${active === tab.id ? 'bg-gray-900 text-white' : 'bg-white text-slate-400'} shadow-md transition duration-500 ease-in-out hover:bg-gray-200 hover:text-gray-900   rounded-lg font-semibold  active:scale-95`}>{tab.text}</button>)}

    </div>
  );
}

export default ShopOrderTab;
