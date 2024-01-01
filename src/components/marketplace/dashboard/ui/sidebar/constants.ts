/* eslint-disable import/no-extraneous-dependencies */
import { RxDashboard } from 'react-icons/rx';
import { FaShop, FaPlus } from 'react-icons/fa6';
import { MdInventory2 } from 'react-icons/md';
import { BsShopWindow } from 'react-icons/bs';
import { IoIosArrowForward, IoIosArrowDown } from 'react-icons/io';
import { FaHome, FaSignOutAlt } from 'react-icons/fa';
import { CiBoxList } from 'react-icons/ci';
import { IconType } from 'react-icons';

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
        title: 'Add Product', id: 3, path: 'product', icon: FaPlus,
      },
      {
        title: 'Your Products', id: 3.2, path: 'product/list', icon: CiBoxList,
      },

    ],
  },
  {
    title: 'Back to home', id: 6, path: '/', icon: FaHome,
  },
  {
    title: 'Sign out', id: 8, path: '#', icon: FaSignOutAlt,
  },

];
