import { IconType } from 'react-icons';
import { BsShopWindow } from 'react-icons/bs';
import { CiUser } from 'react-icons/ci';
import { FaRegAddressCard } from 'react-icons/fa6';
import { LiaSignOutAltSolid } from 'react-icons/lia';
import { FaClipboardList } from "react-icons/fa";
type Option = {
  title: string;
  id: string;
  path: string;
  icon?: IconType;
  active:boolean;
};
export const options: Array<Option> = [
  {
    title: 'Your Profile',
    id: '1',
    path: '/account',
    icon: CiUser,
    active: true,
  },
  {
    title: 'Your Address',
    id: '2',
    path: 'address',
    icon: FaRegAddressCard,
    active: false,
  },
  {
    title: 'Your Orders',
    id: '2.5',
    path: '/myOrders',
    icon: FaClipboardList,
    active: false,
  },
  {
    title: 'Marketplace',
    id: '4',
    path: 'seller',
    icon: BsShopWindow,
    active: false,
  },
  {
    title: 'Signout',
    id: '5',
    path: '#',
    icon: LiaSignOutAltSolid,
    active: false,
  },

];
