import React, { useEffect } from 'react';
import { useTypedDispatch, useTypedSelector } from '@/hooks/user/reduxHooks';
import { addShopList, confirmShopDelete } from '@/utils/reduxSlice/markeplaceSlice';

import { Button } from '@/components/ui/button';
import {
  Table, TableHeader, TableRow, TableHead, TableBody, TableCell,
} from '@/components/ui/table';
import {
  confirmDelete,
} from '@/utils/reduxSlice/productSlice';

import { ChevronDownIcon } from '@radix-ui/react-icons';
import {
  RowSelectionState,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  PaginationState,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { ToastContainer, toast } from 'react-toastify';
import ConfirmBox from '@/components/dialougeBox/ConfirmBox';
import {
  DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ErrorResponse, FetchApiResponse, hasFetchSucceeded } from '@/types/Fetch';
import { useSearchParams } from 'react-router-dom';
import { getShops } from './apis/listShops';
import { useShopColumn } from './columns';

import { SellerProduct } from '../products';
import { deleteShop } from './apis/deleteShop';
import { IShop } from './types';
import { deleteShops } from './apis/deleteShopsbyIds';

type MyShopsList = {
  shops:Array<IShop>;
  totalItems: number;
};

function ListShops() {
  const userId = useTypedSelector((store) => store.app.user?._id);
  const [search, setSearch] = useSearchParams({
    page: String(1),
    owner: userId || '',
    limit: '1',
  });

  const dispatch = useTypedDispatch();
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  const shops = useTypedSelector((store) => store.marketplace.shopsList);
  const isDeleteShop = useTypedSelector((store) => store.marketplace.confirmShopDelete);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    getShops(signal, search.toString())
      .then((response:FetchApiResponse<MyShopsList> | ErrorResponse) => {
        if (hasFetchSucceeded(response)) {
          dispatch(addShopList(response.message));
        }
      }).catch((error) => {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      });

    return function cleanup() {
      abortController.abort();
    };
  }, [dispatch, search, setSearch]);

  const columns = useShopColumn();

  const handleDeleteShop = (shop: IShop) => {
    dispatch(confirmShopDelete({
      confirm: true,
      name: shop.name,
      id: shop._id,
      title: 'Are you sure to delete  shop?',
      info: shop.name,
      bulk: false,
    }));
  };

  // const handleDeleteShops = () => {
  //   dispatch(confirmShopDelete({
  //     confirm: true,
  //     name: '',
  //     id: '',
  //     title: 'Are you sure to delete all selected shops?',
  //     info: '',
  //     bulk: true,
  //   }));
  // };

  const confirmDeleteShops = (shopsIds:string[]) => {
    deleteShops(shopsIds).then((response) => {
      if (response.statusCode === 200) {
        toast.success('Products successfully deleted');
        dispatch(confirmShopDelete({
          confirm: false,
          name: '',
          id: '',
          title: '',
          info: '',
          bulk: false,
        }));
      }
    });
  };
  const handleDeleteProduct = (product:SellerProduct) => {
    dispatch(confirmDelete({
      confirm: true,
      name: product.name,
      productId: product._id,
      title: 'Are you sure to delete product?',
      info: product.name,
      bulk: false,
    }));
  };

  const confirmDeleteShop = (productId:string) => {
    deleteShop(productId).then((response) => {
      if (response.statusCode === 200) {
        toast.success(`${response.message.deleted.name} successfully deleted`);
        dispatch(confirmShopDelete({
          confirm: false,
          name: '',
          id: '',
          title: '',
          info: '',
          bulk: false,
        }));
      }
    });
  };

  const table = useReactTable({
    data: shops.shops,
    columns,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
      pagination,
    },
    getRowId: ((row) => row._id),
    meta: {
      handleDeleteShop,
      handleDeleteProduct,
    },
  });

  const handleNext = () => {
    table.nextPage();
  };

  const handlePrevious = () => {
    table.previousPage();
  };

  return (
    <>
      <div className="top-full flex justify-center   xl:justify-end  mt-32  w-full container ">
        <div className="p-2 flex justify-center xl:justify-end  w-full">
          <div className="rounded-md flex justify-center flex-col border overflow-y-auto">
            <div className=" flex justify-end items-center p-2 py-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    Columns
                    <ChevronDownIcon className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <div className="flex items-center justify-end p-2 py-4">
              {table.getFilteredSelectedRowModel().rows.length ? (
                <div className="flex-1 text-sm  lg:block text-muted-foreground">
                  {table.getFilteredSelectedRowModel().rows.length}
                  {' '}
                  of
                  {' '}
                  {table.getFilteredRowModel().rows.length}
                  {' '}
                  selected.
                </div>
              ) : null}

              <div className="flex-1  items-center gap-1 lg:flex text-sm text-muted-foreground">
                <div>Page</div>
                <span>
                  <strong>
                    {table.getState().pagination.pageIndex + 1}
                    of
                    {table.getPageCount().toLocaleString()}
                  </strong>
                </span>
              </div>
              <div className="flex-1  items-center gap-1 lg:flex text-sm text-muted-foreground">
                <select
                  value={table.getState().pagination.pageSize}
                  onChange={(e) => {
                    table.setPageSize(Number(e.target.value));
                  }}
                >
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      Show
                      {' '}
                      {pageSize}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1 flex-col  lg:flex-row items-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevious}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNext}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isDeleteShop.confirm && (
        <ConfirmBox title={isDeleteShop.title} info={isDeleteShop.name}>
          {isDeleteShop.bulk
            ? <button type="button" onClick={() => confirmDeleteShops(Object.keys(rowSelection))} className="text-white bg-slate-800 hover:bg-slate-700 outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Yes, delete</button>
            : <button type="button" onClick={() => confirmDeleteShop(isDeleteShop.id)} className="text-white bg-slate-800 hover:bg-slate-700 outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Yes, delete</button>}
        </ConfirmBox>
      )}
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default ListShops;
