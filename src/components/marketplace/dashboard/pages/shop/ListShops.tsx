import React, { useEffect } from 'react';
import { useTypedDispatch, useTypedSelector } from '@/hooks/user/reduxHooks';
import { addShopList, confirmShopDelete } from '@/utils/reduxSlice/markeplaceSlice';
import { StatusCodes } from 'http-status-codes';

import { Button } from '@/components/ui/button';
import {
  Table, TableHeader, TableRow, TableHead, TableBody, TableCell,
} from '@/components/ui/table';
import {
  decPreviousProductPageNumber, addProductsList, incNextProductPageNumber, confirmDelete,
} from '@/utils/reduxSlice/productSlice';
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem,
} from '@radix-ui/react-dropdown-menu';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import {
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  RowSelectionState,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  RowData,
} from '@tanstack/react-table';
import { isEmpty } from 'lodash';
import { Input } from '@/components/ui/input';
import queryString from 'query-string';
import { ToastContainer, toast } from 'react-toastify';
import ConfirmBox from '@/components/dialougeBox/ConfirmBox';
import { getShops } from './apis/listShops';
import { useShopColumn } from './columns';

import { SellerProduct } from '../products';
import { deleteShop } from './apis/deleteShop';
import { IShop } from './types';
import { deleteShops } from './apis/deleteShopsbyIds';

declare module '@tanstack/table-core' {
  interface TableMeta<TData extends RowData> {
    handleDeleteProduct:(product:SellerProduct) => void
    handleDeleteShop:(shop:IShop) => void
  }
}

function ListShops() {
  const queryObj:{ [x:string]:any } = {};
  queryObj.page = 1;
  const dispatch = useTypedDispatch();
  const userId = useTypedSelector((store) => store.app.user?._id);
  queryObj.owner = userId;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [next, setNext] = React.useState<boolean>(false);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  const shops = useTypedSelector((store) => store.marketplace.shopsList);
  const isDeleteShop = useTypedSelector((store) => store.marketplace.confirmShopDelete);
  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    if (userId) {
      getShops(signal, queryString.stringify(queryObj)).then((response) => {
        if (response && response.statusCode === StatusCodes.OK && response.success) {
          dispatch(addShopList(response.message));
        }
      });
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [dispatch, userId, isDeleteShop.confirm]);

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

  const handleDeleteShops = () => {
    dispatch(confirmShopDelete({
      confirm: true,
      name: '',
      id: '',
      title: 'Are you sure to delete all selected shops?',
      info: '',
      bulk: true,
    }));
  };

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
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    getRowId: ((row) => row._id),
    meta: {
      handleDeleteShop,
      handleDeleteProduct,
    },
  });

  const handleNext = () => {
    if (!table.getCanNextPage()) {
      dispatch(incNextProductPageNumber());

      if (!queryObj.page) return;
      queryObj.page += 1;
      const abortController = new AbortController();
      const { signal } = abortController;
      getShops(signal, queryString.stringify(queryObj)).then((response) => {
        if (response.success) {
          dispatch(addProductsList(response.message));
        } else {
          setNext(true);
        }
        abortController.abort();
      });
    }

    table.nextPage();
  };

  const handlePrevious = () => {
    if (!table.getCanPreviousPage()) {
      dispatch(decPreviousProductPageNumber());

      if (!queryObj.page) return;
      queryObj.page -= 1;
      const abortController = new AbortController();
      const { signal } = abortController;
      getShops(signal, queryString.stringify(queryObj)).then((response) => {
        if (response.success) {
          dispatch(addProductsList(response.message));
        } else {
          setNext(true);
        }
        abortController.abort();
      });
    }
    table.previousPage();
  };

  return (
    <>
      <div className="w-full sm:w-11/12 mt-24 lg:mt-10  flex justify-center items-center mx-auto">
        <div className="md:mt-24  p-2 w-full">
          <div className=" flex items-center py-4">
            <Input
              placeholder="Filter by product name..."
              value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
              onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
              className="max-w-sm"
            />
            <Button
              variant="outline"
              size="sm"
              className="ml-5"
              onClick={handleDeleteShops}
              disabled={isEmpty(rowSelection)}
            >
              Bulk Delete
            </Button>
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
          <div className="rounded-md border">
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
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length}
              {' '}
              of
              {' '}
              {table.getFilteredRowModel().rows.length}
              {' '}
              row(s) selected.
            </div>
            <div className="flex-1 text-sm text-muted-foreground">
              page:
              {' '}
              {queryObj.page}
            </div>
            <div className="flex-1 text-sm text-muted-foreground">
              showing
              {' '}
              {table.getFilteredRowModel().rows.length}

              {' '}
              of
              {' '}
              {shops.totalItems}
            </div>
            <div className="space-x-2">
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
                disabled={next}
              >
                Next
              </Button>
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
