/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { useTypedDispatch, useTypedSelector } from '@/hooks/user/reduxHooks';
import {
  addProductsList,
  confirmDelete,
  decPreviousProductPageNumber,
  incNextProductPageNumber,
} from '@/utils/reduxSlice/productSlice';

import {
  ChevronDownIcon,
} from '@radix-ui/react-icons';
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  RowData,
  RowSelectionState,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import ConfirmBox from '@/components/dialougeBox/ConfirmBox';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import queryString from 'query-string';
import { isEmpty } from 'lodash';
import { StatusCodes } from 'http-status-codes';
import { removeUser } from '@/utils/reduxSlice/appSlice';
import { useNavigate } from 'react-router-dom';
import AuthHelper from '@/components/auth/apis/helper';
import { getProductsBySellerId } from './apis/getProduct';
import { deleteProductById } from './apis/deleteProduct';
import { deleteProductsByIds } from './apis/deleteProductsByIds';
import { SellerProduct } from '.';
import { useColumn } from './column';

const queryObj:{ page?:number } = {};

declare module '@tanstack/table-core' {
  interface TableMeta<TData extends RowData> {
    handleDeleteProduct:(product:SellerProduct) => void
  }
}

function ListProductsWrapper() {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const productStore = useTypedSelector((store) => store.products);
  const columns = useColumn();

  useEffect(() => {
    queryObj.page = 1;
    getProductsBySellerId(queryString.stringify(queryObj)).then((response) => {
      if (response.statusCode === 200) {
        dispatch(addProductsList(response.message));
      } else if (response?.statusCode === StatusCodes.UNAUTHORIZED
        && response?.success === false) {
        AuthHelper.clearSignedOnData();
        dispatch(removeUser());
        navigate('/auth');
      }
    });
  }, [dispatch, navigate, productStore.confirmDelete]);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [next, setNext] = React.useState<boolean>(false);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

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
  const handleDeleteProducts = () => {
    dispatch(confirmDelete({
      confirm: true,
      name: '',
      productId: '',
      title: 'Delete all selected products?',
      info: '',
      bulk: true,
    }));
  };
  const confirmDeleteProduct = (productId:string) => {
    deleteProductById(productId).then((response) => {
      if (response.statusCode === 200) {
        toast.success(`${response.message.product.name} successfully deleted`);
        dispatch(confirmDelete({
          confirm: false,
          name: '',
          productId: '',
          title: '',
          info: '',
          bulk: false,
        }));
      }
    });
  };

  const confirmDeleteProducts = (productsIds:string[]) => {
    deleteProductsByIds(productsIds).then((response) => {
      if (response.statusCode === 200) {
        toast.success('Products successfully deleted');
        dispatch(confirmDelete({
          confirm: false,
          name: '',
          productId: '',
          title: '',
          info: '',
          bulk: false,
        }));
      }
    });
  };

  const table = useReactTable({
    data: productStore && productStore.productListResponse.products,
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
    meta: { handleDeleteProduct },
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
              onClick={handleDeleteProducts}
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
              {productStore.productListCurrentPage}
            </div>
            <div className="flex-1 text-sm text-muted-foreground">
              showing
              {' '}
              {table.getFilteredRowModel().rows.length}

              {' '}
              of
              {' '}
              {productStore.productListResponse.totalItems}
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
      {productStore.confirmDelete.confirm

    && (
      <ConfirmBox title={productStore.confirmDelete.title} info={productStore.confirmDelete.name}>
        {productStore.confirmDelete.bulk
          ? <button type="button" onClick={() => confirmDeleteProducts(Object.keys(rowSelection))} className="text-white bg-slate-800 hover:bg-slate-700 outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Yes, delete</button>
          : <button type="button" onClick={() => confirmDeleteProduct(productStore.confirmDelete.productId)} className="text-white bg-slate-800 hover:bg-slate-700 outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Yes, delete</button>}
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

export default ListProductsWrapper;
