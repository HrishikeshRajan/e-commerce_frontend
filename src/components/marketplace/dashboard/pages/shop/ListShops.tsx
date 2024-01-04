import React, { useEffect } from 'react';
import { useTypedDispatch, useTypedSelector } from '@/hooks/user/reduxHooks';
import { addShops } from '@/utils/reduxSlice/markeplaceSlice';
import { StatusCodes } from 'http-status-codes';

import { Button } from '@/components/ui/button';
import {
  Table, TableHeader, TableRow, TableHead, TableBody, TableCell,
} from '@/components/ui/table';
import { decPreviousProductPageNumber, addProductsList, incNextProductPageNumber } from '@/utils/reduxSlice/productSlice';
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
} from '@tanstack/react-table';
import { isEmpty } from 'lodash';
import { Input } from '@/components/ui/input';
import queryString from 'query-string';
import { ToastContainer } from 'react-toastify';
import { getShops } from './apis/listShops';
import { getProductsBySellerId } from '../products/apis/getProduct';
import { useShopColumn } from './columns';

function ListShops() {
  const queryObj:{ page?:number } = {};

  const dispatch = useTypedDispatch();
  const userId = useTypedSelector((store) => store.app.user?._id);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [next, setNext] = React.useState<boolean>(false);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    if (userId) {
      getShops(signal, userId).then((response) => {
        if (response && response.statusCode === StatusCodes.OK && response.success) {
          dispatch(addShops(response.message?.message));
        }
      });
    }
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const shops = useTypedSelector((store) => store.marketplace.shop.shops);

  const columns = useShopColumn();
  const table = useReactTable({
    data: shops,
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
  });

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
              add current page value
            </div>
            <div className="flex-1 text-sm text-muted-foreground">
              showing
              {' '}
              {table.getFilteredRowModel().rows.length}

              {' '}
              of
              {' '}
              Display total items in number
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (table.getCanPreviousPage()) {
                    dispatch(decPreviousProductPageNumber());
                    if (!queryObj.page) return;
                    queryObj.page -= 1;
                    getProductsBySellerId(queryString.stringify(queryObj)).then((response) => {
                      if (response.success) {
                        dispatch(addProductsList(response.message));
                      }
                    });
                  }
                  table.previousPage();
                }}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (!table.getCanNextPage()) {
                    dispatch(incNextProductPageNumber());

                    if (!queryObj.page) return;
                    queryObj.page += 1;

                    getProductsBySellerId(queryString.stringify(queryObj)).then((response) => {
                      if (response.success) {
                        dispatch(addProductsList(response.message));
                      } else {
                        setNext(true);
                      }
                    });
                  }
                  table.nextPage();
                }}
                disabled={next}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>

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
