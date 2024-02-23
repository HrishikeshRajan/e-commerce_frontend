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

import { TOrder } from '@/types/Table';
import React from 'react';
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

export enum ORDER_STATUS {
  NOT_PROCESSED = 'Not_processed',
  PROCESSING = 'Processing',
  SHIPPED = 'Shipped',
  CANCELED = 'CANCELED',
  DELIVERED = 'Delivered',
}

const StatusToCode:Record<string, string> = {
  Not_processed: 'N',
  Processing: 'P',
  Shipped: 'S',
  CANCELED: 'C',
  Delivered: 'D',
};

function OrderStatus({ table }:{ table:Row<TOrder>, }) {
  const [position, setPosition] = React.useState(table.original.orderStatus);
  const updateOrderStatus = async (e:string) => {
    setPosition(e);
    try {
      await fetch(`http://localhost:4000/api/v1/orders/status/${StatusToCode[e]}/carts/${table.original.cartId}/products/${table.original.product.productId}`, {
        method: 'PUT',
        credentials: 'include',
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className={`${position === 'CANCELED' ? 'bg-red-500 text-white' : position === 'Delivered' ? 'bg-green-500 text-white' : 'bg-slate-100'}`}>
          {position}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>

          <DropdownMenuRadioGroup value={position} onValueChange={updateOrderStatus}>
            <DropdownMenuRadioItem value={ORDER_STATUS.NOT_PROCESSED}>
              {ORDER_STATUS.NOT_PROCESSED}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value={ORDER_STATUS.PROCESSING}>
              {ORDER_STATUS.PROCESSING}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value={ORDER_STATUS.SHIPPED}>
              {ORDER_STATUS.SHIPPED}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value={ORDER_STATUS.DELIVERED}>
              {ORDER_STATUS.DELIVERED}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value={ORDER_STATUS.CANCELED}>
              {ORDER_STATUS.CANCELED}
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const columnHelper = createColumnHelper<TOrder>();

export const useColumn = () => [

  columnHelper.accessor('orderId', {
    header: () => (
      <span className="flex items-center">
        Order Id
      </span>
    ),
    cell: (info) => (
      <button type="button" onClick={() => navigator.clipboard.writeText(info.getValue())}>
        {info.getValue()}
      </button>
    ),
    enableSorting: false,
  }),
  columnHelper.accessor('orderDate', {
    id: 'orderDate',
    header: () => (
      <>
        <span className="flex items-center" data-tooltip-id="sort" data-tooltip-content="Click to sort">
          Order Date/Time
        </span>
        <Tooltip id="sort" />
      </>
    ),
    cell: (info) => new Date(info.getValue()).toLocaleString(),
  }),
  columnHelper.accessor('customerId.fullname', {
    id: 'fullname',
    header: () => 'Customer Name',
    cell: (info) => info.getValue(),

  }),
  columnHelper.accessor('customerId._id', {
    id: 'customerId',
    header: () => 'Customer Id',
    cell: (info) => info.getValue(),
    enableSorting: false,
  }),
  columnHelper.accessor('product.name', {
    id: 'productName',
    header: () => 'Product Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('product.productId', {
    id: 'productId',
    header: () => 'Product Id',
    cell: (info) => info.getValue(),
    enableSorting: false,
  }),
  columnHelper.accessor('qty', {
    id: 'qty',
    header: () => (
      <span className="flex items-center">
        Qty
      </span>
    ),
    cell: (info) => (info.row.original.product.stock < info.getValue() ? <span className="text-red-500">{info.getValue()}</span> : <span className="text-black">{info.getValue()}</span>),
  }),
  columnHelper.accessor('product.stock', {
    id: 'stock',
    header: () => (
      <span className="flex items-center">
        Stock
      </span>
    ),
    cell: (info) => (info.getValue() < 5 ? <span className="text-red-500">{info.getValue()}</span> : <span className="text-black">{info.getValue()}</span>),
  }),
  columnHelper.accessor('options.size', {
    id: 'size',
    header: () => 'Size',
    cell: (info) => info.getValue(),
    enableSorting: false,
  }),
  columnHelper.accessor('options.color', {
    id: 'color',
    header: () => 'Color',
    cell: (info) => info.getValue(),
    enableSorting: false,
  }),
  columnHelper.accessor('product.price', {
    id: 'productPrice',
    header: () => 'Unit Price',
    cell: (info) => formattedAmount(info.getValue()),
  }),
  columnHelper.accessor('gstInPercentage', {
    id: 'gst',
    header: () => 'GST',
    cell: (info) => `%${info.getValue()}`,
    enableSorting: false,
  }),
  columnHelper.accessor('taxAmount', {
    id: 'taxAmount',
    header: () => 'Tax Amount',
    cell: (info) => formattedAmount(info.getValue()),
  }),
  columnHelper.accessor('totalPriceAfterTax', {
    id: 'totalPriceAfterTax',
    header: () => (
      <span className="flex items-center">
        Total Price
      </span>
    ),
    cell: (info) => formattedAmount(info.getValue()),
  }),
  columnHelper.accessor('paymentDetails.status', {
    header: () => 'Payment Status',
    cell: (info) => <span className=" rounded p-1 bg-green-500 text-white">{info.getValue()}</span>,
    enableSorting: false,
  }),
  columnHelper.accessor('paymentDetails.paymentId', {
    header: () => 'Payment Id',
    cell: (info) => info.getValue(),
    enableSorting: false,
  }),
  columnHelper.accessor('shippingAddress', {
    header: () => 'Shipping Address',
    cell: (info) => `${info.getValue().fullname}\n ${info.getValue().city}\n${info.getValue().homeAddress}\n${info.getValue().phoneNo}\n${info.getValue().postalCode}\n${info.getValue().state}`,
    enableSorting: false,
  }),
  columnHelper.accessor('orderStatus', {
    header: () => 'Order Status',
    cell: (info) => flexRender(OrderStatus, { table: info.row }),
    enableSorting: false,

  }),
];
