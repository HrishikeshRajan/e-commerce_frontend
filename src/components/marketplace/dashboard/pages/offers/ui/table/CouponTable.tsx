/* eslint-disable react/jsx-indent */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-closing-bracket-location */
import React, { useEffect, useState } from 'react';
import {
  flexRender, getCoreRowModel, useReactTable,
  getSortedRowModel,
  PaginationState,
  getFilteredRowModel,
  getPaginationRowModel,
  RowSelectionState,
} from '@tanstack/react-table';
import { Promo } from '@/types/Promo';
import { useTypedSelector } from '@/hooks/user/reduxHooks';
import {
 DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
 Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { useColumn } from './TableHeaders';

function CouponTable() {
  const [data, setData] = useState<Promo[]>([]);

  const userId = useTypedSelector((store) => store.app.user?._id);

  const [pagination, setPagination] = React.useState<PaginationState>({
  pageIndex: 0,
  pageSize: 10,
  });
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  useEffect(() => {
    try {
      const getOrders = async () => {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/seller/promo/all?ownerId=${userId}`, {
          credentials: 'include',
        });
        const result = await response.json();
        setData(result.message.promos);
      };
      getOrders();
    } catch (error) {
      console.log(error);
    }
  }, [userId]);

  const columns = useColumn();
  const table = useReactTable({
    data,
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
  });

 const handleNext = () => {
  table.nextPage();
};

const handlePrevious = () => {
  table.previousPage();
};

 return (
  <div className="top-full flex justify-center  w-full   mt-32">
  <div className="p-2 flex justify-center xl:justify-end  w-full">
    <div className="flex justify-center flex-col border rounded-xl overflow-y-auto">
      <div className=" flex justify-end items-center p-2 py-4 ">
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

  );
}

export default CouponTable;
