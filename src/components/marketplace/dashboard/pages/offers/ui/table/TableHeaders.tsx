/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
/* eslint-disable security/detect-object-injection */
/* eslint-disable @typescript-eslint/naming-convention */
import {
  Row,
  createColumnHelper,
  flexRender,
} from '@tanstack/react-table';

import { useState } from 'react';
import {

} from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formattedAmount } from '@/utils/convertToRupees';

import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';
import { Promo } from '@/types/Promo';

export enum PromoStatus {
  PENDING = 'Pending',
  ACTIVE = 'Active',
  EXPIRED = 'Expired',
}

function OrderStatus({ table }:{ table:Row<Promo>, }) {
  const [position, setPosition] = useState(table.original.status);
  const updateOrderStatus = async (e:string) => {
    setPosition(e);

    try {
      const response = fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/seller/promo/status?status=${e}&promoId=${table.original._id}`, {
        method: 'PUT',
        credentials: 'include',
      });
      const data = (await response).json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className={`${position === 'Expired' ? 'bg-red-500 text-white' : position === 'Active' ? 'bg-green-500 text-white' : 'bg-slate-100'}`}>
          {position}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>

          <DropdownMenuRadioGroup value={position} onValueChange={updateOrderStatus}>
            <DropdownMenuRadioItem value={PromoStatus.PENDING}>
              {PromoStatus.PENDING}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value={PromoStatus.ACTIVE}>
              {PromoStatus.ACTIVE}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value={PromoStatus.EXPIRED}>
              {PromoStatus.EXPIRED}
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const columnHelper = createColumnHelper<Promo>();

export const useColumn = () => [

  columnHelper.accessor('_id', {
    id: 'promoId',
    header: () => (
      <span className="flex items-center">
        Promo Id
      </span>
    ),
    cell: (info) => (
      <button type="button" onClick={() => navigator.clipboard.writeText(info.getValue())}>
        {info.getValue()}
      </button>
    ),
    enableSorting: false,
  }),
  columnHelper.accessor('startTime', {
    id: 'startTime',
    header: () => (
      <>
        <span className="flex items-center" data-tooltip-id="sort" data-tooltip-content="Click to sort">
          Start Date/Time
        </span>
        <Tooltip id="sort" />
      </>
    ),
    cell: (info) => new Date(info.getValue()).toUTCString().slice(0, 25),
    enableColumnFilter: false,
  }),
  columnHelper.accessor('endTime', {
    id: 'endTime',
    header: () => 'End Date/Time',
    cell: (info) => new Date(info.getValue()).toUTCString().slice(0, 25),

  }),
  columnHelper.accessor('code', {
    id: 'code',
    header: () => 'Promo Code',
    cell: (info) => info.getValue(),
    enableSorting: false,
  }),
  columnHelper.accessor('method', {
    id: 'method',
    header: () => (
      <>

        Method
        <Tooltip id="sort" />
      </>
    ),
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('type', {
    id: 'type',
    header: () => 'Type',
    cell: (info) => info.getValue(),
    enableSorting: false,
  }),
  columnHelper.accessor('minAmountInCart', {
    id: 'minAmountInCart',
    header: () => (
      <>
        <span className="flex items-center" data-tooltip-id="sort" data-tooltip-content="Click to sort">
          Cart Minimum
        </span>
        <Tooltip id="sort" />
      </>
    ),
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('maxUsage', {
    id: 'maxUsage',
    header: () => (
      <>
        <span className="flex items-center" data-tooltip-id="sort" data-tooltip-content="Click to sort">
          Usage Limit
        </span>
        <Tooltip id="sort" />
      </>
    ),
    cell: (info) => (info.getValue() < 5 ? <span className="text-red-500">{info.getValue()}</span> : <span className="text-black">{info.getValue()}</span>),
  }),
  columnHelper.accessor('maxUsagePerUser', {
    id: 'maxUsagePerUser',
    header: () => 'Usage per user',
    cell: (info) => info.getValue(),
    enableSorting: false,
  }),
  columnHelper.accessor('discountAmount', {
    id: 'discountAmount',
    header: () => (
      <>
        <span className="flex items-center" data-tooltip-id="sort" data-tooltip-content="Click to sort">
          DiscountAmount
        </span>
        <Tooltip id="sort" />
      </>
    ),
    cell: (info) => (info.getValue() ? formattedAmount(info.getValue()!) : 'Nill'),
  }),
  columnHelper.accessor('discountPercentage', {
    id: 'discountPercentage',
    header: () => 'Discount Percentage',
    cell: (info) => (info.getValue() ? `%${info.getValue()}` : 'Nill'),
    enableSorting: false,
    enableColumnFilter: false,
  }),
  columnHelper.accessor('status', {
    id: 'status',
    header: () => 'Status',
    cell: (info) => flexRender(OrderStatus, { table: info.row }),
    enableSorting: false,
    enableColumnFilter: false,

  }),
];
