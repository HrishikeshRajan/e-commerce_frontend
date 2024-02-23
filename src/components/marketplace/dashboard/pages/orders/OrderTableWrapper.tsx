/* eslint-disable react/jsx-indent */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-closing-bracket-location */
import React, { Fragment, useEffect, useState } from 'react';
import { TOrder } from '@/types/Table';
import {
  flexRender, getCoreRowModel, useReactTable, SortingState,
  getSortedRowModel,
} from '@tanstack/react-table';
import { useParams, useSearchParams } from 'react-router-dom';
import { useColumn } from './TableHeaders';

function OrderTableWrapper() {
  const [data, setData] = useState<TOrder[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const params = useParams();
  const [search, setSearchParams] = useSearchParams();

  const idTocode = (id:string, desc:boolean) => (desc ? `-${id}` : id);

  useEffect(() => {
    if (sorting && sorting.length > 0) {
      search.set('sort', idTocode(sorting[0].id, sorting[0].desc));
      setSearchParams(search);
    } else {
      search.delete('sort');
      setSearchParams(search);
    }
  }, [search, setSearchParams, sorting]);

  useEffect(() => {
    try {
      search.set('shopId', params.id!);
      search.set('resultPerPage', '10');
      search.set('page', '1');
      search.set('shopId', params.id!);
      setSearchParams(search);
      const getOrders = async () => {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/orders/byShops?${search.toString()}`, {
          credentials: 'include',
        });
        const result = await response.json();
        setData(result.message.orders);
      };
      getOrders();
    } catch (error) {
      console.log(error);
    }
  }, [params.id, search, setSearchParams, sorting]);
  const columns = useColumn();

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    manualSorting: true,
    enableMultiSort: true,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  return (
    <div className="w-full  flex flex-col justify-center mt-24 px-5  ">
      <h1 className="text-xl font-bold text-slate-500 p-3">Your Orders</h1>
      <div className=" shadow-md w-full p-2 rounded-lg bg-white overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-800     ">
          <thead className=" ">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b-2">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} colSpan={header.colSpan} className="p-3 ">
                    {header.isPlaceholder ? null : (
                      <button
                        type="button"
                        {...{
                          className: header.column.getCanSort()
                            ? 'cursor-pointer select-none flex justify-center px-10 outline-none items-center'
                            : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                              {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </button>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <Fragment key={row.id}>
                  <tr className="border-b-2">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className=" text-xs  rounded-xl px-3 pb-1 overflow-ellipsis">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                </Fragment>
              ))) : (
                <tr>
                <td
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                  No results.
                </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderTableWrapper;
