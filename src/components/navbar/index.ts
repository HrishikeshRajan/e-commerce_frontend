import { IconType } from 'react-icons';
import { BsShopWindow } from 'react-icons/bs';
import { FaRegCircleUser } from 'react-icons/fa6';

export interface NavbarMenu {
  id:number;
  title: string;
  path: string;
  style: string;
  icon?: IconType;
  isOpen:boolean;
  type: 'collection' | 'plain'
  submenu?: Array<NavbarMenu>;
}
const style = 'hidden lg:flex p-2 flex gap-2 items-center  cursor-pointer ';
export const NavOptions:NavbarMenu[] = [
  {
    id: 1,
    title: 'Marketplace',
    path: 'account/seller',
    style,
    icon: BsShopWindow,
    isOpen: false,
    type: 'plain',
  },
  {
    id: 1.4,
    title: 'Coupons',
    path: 'coupons',
    style,
    isOpen: false,
    type: 'plain',
  },
  {
    id: 2,
    title: 'Account',
    path: '#',
    style,
    icon: FaRegCircleUser,
    isOpen: false,
    type: 'collection',
    submenu: [
      {
        id: 2.2,
        title: 'Orders',
        path: 'myOrders',
        style,
        isOpen: false,
        type: 'plain',
      },
      {
        id: 2.3,
        title: 'Cart',
        path: 'cart',
        style,
        isOpen: false,
        type: 'plain',
      },
      {
        id: 2.5,
        title: 'Settings',
        path: 'account',
        style,
        isOpen: false,
        type: 'plain',
      },
      {
        id: 2.6,
        title: 'Signout',
        path: '#',
        style,
        isOpen: false,
        type: 'plain',
      },
      {
        id: 2.7,
        title: 'Signin',
        path: '/auth',
        style,
        isOpen: false,
        type: 'plain',
      },
    ],
  },

];
