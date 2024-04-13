/* eslint-disable import/no-extraneous-dependencies */
import { RxDashboard } from 'react-icons/rx';
import { FaShop, FaPlus } from 'react-icons/fa6';
import { MdInventory2 } from 'react-icons/md';
import { BsShopWindow } from 'react-icons/bs';
import { IoIosArrowForward, IoIosArrowDown } from 'react-icons/io';
import { FaHome, FaSignOutAlt } from 'react-icons/fa';
import { CiBoxList, CiCircleList } from 'react-icons/ci';
import { IconType } from 'react-icons';
import { BiSolidShoppingBags, BiSolidOffer } from 'react-icons/bi';
import { IoAddCircleOutline, IoFlashOutline } from 'react-icons/io5';

export type SidebarItemTypes = {
  title:string;
  id:number;
  path:string;
  icon: IconType,
  isActive:boolean;
  isOpen?:boolean;
  type: 'COLLECTION' | 'LINK'
  childrenIcons?:{ arrowForward:IconType, arrowDown:IconType };
  children?:SidebarItemTypes[];
  onClick?:(e:any) => void
};
export const list:SidebarItemTypes[] = [
  {
    title: 'Dashboard',
    id: 1,
    path: '/marketplace/dashboard',
    icon: RxDashboard,
    isActive: true,
    type: 'COLLECTION',
  },
  {
    title: 'Manage Shops',
    id: 2,
    path: 'shop',
    icon: FaShop,
    childrenIcons: {
      arrowForward: IoIosArrowForward,
      arrowDown: IoIosArrowDown,
    },
    isActive: false,
    isOpen: false,
    children: [
      {
        title: 'Add shop',
        id: 2.1,
        path: 'shop',
        icon: FaPlus,
        isActive: false,
        type: 'LINK',
      },
      {
        title: 'My Shops',
        id: 2.2,
        path: 'shop/myshops',
        icon: BsShopWindow,
        isActive: false,
        isOpen: false,
        type: 'LINK',
      },
    ],
    type: 'COLLECTION',
  },
  {
    title: 'Manage Products',
    id: 3,
    path: 'product',
    icon: MdInventory2,
    childrenIcons: {
      arrowForward: IoIosArrowForward,
      arrowDown: IoIosArrowDown,
    },
    children: [
      {
        title: 'Your Products',
        id: 3,
        path: 'product/list',
        icon: CiBoxList,
        isActive: false,
        type: 'LINK',
      },
    ],
    isActive: false,
    isOpen: false,
    type: 'COLLECTION',
  },
  {
    title: 'My Orders',
    id: 7,
    path: 'orders',
    icon: BiSolidShoppingBags,
    isActive: false,
    type: 'COLLECTION',
  },
  {
    title: 'Offers',
    id: 8,
    path: 'offers',
    icon: BiSolidOffer,
    childrenIcons: {
      arrowForward: IoIosArrowForward,
      arrowDown: IoIosArrowDown,
    },
    children: [
      {
        title: 'Create',
        id: 8,
        path: 'offers/create',
        icon: IoAddCircleOutline,
        isActive: false,
        type: 'LINK',
      },
      {
        title: 'My Coupons',
        id: 8.2,
        path: 'offers/list',
        icon: CiCircleList,
        isActive: false,
        type: 'LINK',
      },
    ],
    isOpen: false,
    isActive: false,
    type: 'COLLECTION',
  },
  {
    title: 'Flash Sales',
    id: 9,
    path: 'flashsale',
    icon: IoFlashOutline,
    childrenIcons: {
      arrowForward: IoIosArrowForward,
      arrowDown: IoIosArrowDown,
    },
    children: [
      {
        title: 'Create',
        id: 9,
        path: 'flashsale/create',
        icon: IoAddCircleOutline,
        isActive: false,
        type: 'LINK',
      },
    ],
    isActive: false,
    type: 'COLLECTION',
  },
  {
    title: 'Back to home',
    id: 10,
    path: '/',
    icon: FaHome,
    isActive: false,
    type: 'LINK',
  },
  {
    title: 'Sign out',
    id: 11,
    path: '#',
    icon: FaSignOutAlt,
    isActive: false,
    type: 'LINK',
  },

];
