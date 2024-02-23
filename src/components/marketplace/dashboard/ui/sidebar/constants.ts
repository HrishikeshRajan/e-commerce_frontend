/* eslint-disable import/no-extraneous-dependencies */
import { RxDashboard } from 'react-icons/rx';
import { FaShop, FaPlus } from 'react-icons/fa6';
import { MdInventory2 } from 'react-icons/md';
import { BsShopWindow } from 'react-icons/bs';
import { IoIosArrowForward, IoIosArrowDown } from 'react-icons/io';
import { FaHome, FaSignOutAlt } from 'react-icons/fa';
import { CiBoxList } from 'react-icons/ci';
import { IconType } from 'react-icons';
import { BiSolidShoppingBags } from 'react-icons/bi';

export type SidebarItemTypes = {
  title:string
  id:number
  path:string,
  icon: IconType,
  childrenIcons?:{ [x:string]:IconType }
  children?:SidebarItemTypes[]
};
export const menu:SidebarItemTypes[] = [
  {
    title: 'Dashboard', id: 1, path: '/marketplace/dashboard', icon: RxDashboard,
  },
  {
    title: 'Manage Shops',
    id: 2.1,
    path: 'shop',
    icon: FaShop,
    childrenIcons: {
      arrowRight: IoIosArrowForward,
      arrowDown: IoIosArrowDown,
    },
    children: [
      {
        title: 'Add shops', id: 2.1, path: 'shop', icon: FaPlus,
      },
      {
        title: 'My Shops', id: 2.2, path: 'shop/myshops', icon: BsShopWindow,
      },

    ],
  },
  {
    title: 'Manage Products',
    id: 3,
    path: 'product',
    icon: MdInventory2,
    childrenIcons: {
      arrowRight: IoIosArrowForward,
      arrowDown: IoIosArrowDown,
    },
    children: [
      {
        title: 'Your Products', id: 3, path: 'product/list', icon: CiBoxList,
      },

    ],
  },
  {
    title: 'My Orders', id: 7, path: 'orders', icon: BiSolidShoppingBags,
  },
  {
    title: 'Back to home', id: 8, path: '/', icon: FaHome,
  },
  {
    title: 'Sign out', id: 9, path: '#', icon: FaSignOutAlt,
  },

];
