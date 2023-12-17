/* eslint-disable import/no-extraneous-dependencies */

// IoIosArrowForward, IoIosArrowDown,
import {
  IoIosSettings,
} from 'react-icons/io';
import { RiShoppingBag3Fill } from 'react-icons/ri';
import { FaBook } from 'react-icons/fa';
import { SiHomeassistantcommunitystore } from 'react-icons/si';
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
    title: 'Cart',
    path: 'cart',
    id: 1,
    icon: RiShoppingBag3Fill,
  },
  {
    title: 'Become a Seller',
    path: 'account/seller',
    id: 2,
    icon: SiHomeassistantcommunitystore,

  },
  {
    title: 'Orders',
    path: 'orders',
    id: 3,
    icon: FaBook,
  },

  {
    title: 'Settings', id: 4, path: 'settings', icon: IoIosSettings,

  },

];
