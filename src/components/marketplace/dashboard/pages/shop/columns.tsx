import { MdDeleteForever } from 'react-icons/md';

import {
  CaretSortIcon,
  DotsHorizontalIcon,
} from '@radix-ui/react-icons';
import {
  ColumnDef,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Checkbox } from '@/components/ui/checkbox';
import { Link } from 'react-router-dom';
import { IShop } from './types';

export const useShopColumn = () => {
  const columns: ColumnDef<IShop>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected()
              || (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: '_id',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Shop ID
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="capitalize pl-4">{row.original._id}</div>
      ),
      footer: (props) => props.column.id,
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Shop Name
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="capitalize pl-4">{row.original.name}</div>
      ),
      footer: (props) => props.column.id,
    },
    {
      accessorKey: 'email',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="lowercase pl-4">{row.original.email}</div>,
      footer: (props) => props.column.id,
    },
    {
      accessorKey: 'isActive',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Shop Status
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="lowercase pl-4">{row.original.isActive ? <span className="text-green-400">Active</span> : <span className="text-green-red">false</span>}</div>,
      footer: (props) => props.column.id,
    },
    {
      id: 'actions',
      header: 'Actions',
      enableHiding: false,
      cell: (options) => {
        const shop = options.row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(shop._id)}
              >
                Copy Shop ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem><Link to={`/marketplace/dashboard/product/${shop._id}`}>Add Product</Link></DropdownMenuItem>
              <DropdownMenuItem><Link to={`/marketplace/dashboard/shop/edit/${shop._id}`}>Edit Shop details</Link></DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => options
                  .table
                  .options
                  .meta?.handleDeleteShop(shop)}
              >
                {' '}
                <MdDeleteForever />
                {' '}
                <span className="p-1 text-red-500">Delete shop  </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return columns;
};
