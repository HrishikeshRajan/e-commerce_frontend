/* eslint-disable react/jsx-indent */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-closing-bracket-location */
import React, { Fragment, useEffect, useState } from 'react';
import { TOrder } from '@/types/Table';
import {
  flexRender, getCoreRowModel, useReactTable, SortingState,
  getSortedRowModel,
  PaginationState,
} from '@tanstack/react-table';
import { useParams, useSearchParams } from 'react-router-dom';
import { useColumn } from './TableHeaders';

function OrderTableWrapper() {
  const [data, setData] = useState<TOrder[]>([]);
  const [pages, setPages] = useState<number>(-1);
  const [sorting, setSorting] = useState<SortingState>([]);
  const params = useParams();
  const [search, setSearchParams] = useSearchParams();

  const [{ pageIndex, pageSize }, setPagination] = React.useState<PaginationState>({
      pageIndex: search.get('page') ? parseInt(search.get('page') as string, 10) - 1 : 0,
      pageSize: 5,
    });

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

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );

  useEffect(() => {
    try {
      search.set('shopId', params.id!);
      search.set('resultPerPage', String(pageSize));
      search.set('shopId', params.id!);
      setSearchParams(search);
      const getOrders = async () => {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/orders/byShops?${search.toString()}`, {
          credentials: 'include',
        });
        const result = await response.json();
        setData(result.message.orders);
        setPages(result.message.TotalPages);
      };
      getOrders();
    } catch (error) {
      console.log(error);
    }
  }, [params.id, search, setSearchParams, sorting, pageIndex, pageSize]);

  const columns = useColumn();
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination,
    },
    manualSorting: true,
    enableMultiSort: true,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    pageCount: pages ?? -1,
    onPaginationChange: setPagination,
  });

  useEffect(() => {
     search.set('page', `${table.getState().pagination.pageIndex + 1}`);
     setSearchParams(search, { replace: true });
 }, [pageIndex, search, setSearchParams, table]);
  return (
    <div className="w-full  flex flex-col justify-center mt-24 px-5  ">
      <h1 className="text-xl font-bold text-slate-500 p-3">Your Orders</h1>
      <div className=" shadow-md w-full p-2 rounded-lg bg-white overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-800     ">
          <thead className=" ">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b-2">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} colSpan={header.colSpan} className="p-2 ">
                    {header.isPlaceholder ? null : (
                      <button
                        type="button"
                        {...{
                          className: header.column.getCanSort()
                            ? 'cursor-pointer select-none flex  justify-center border-none  outline-none items-center'
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
        <div className="flex items-center gap-2">
        <button
          type="button"
          className="border rounded p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
        type="button"
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
        type="button"
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
        type="button"
          className="border rounded p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1}
              {' '}
                  of
                {' '}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 20, 30, 40, 50].map((size) => (
            <option
              key={size}
              value={size}
              onChange={(e) => {
              search.set('resultPerPage', e as unknown as string);
              setSearchParams(search);
            }}>
              Show
              {' '}
              {' '}
              {size}
            </option>
          ))}
        </select>
        </div>
      </div>
    </div>
  );
}

export default OrderTableWrapper;
