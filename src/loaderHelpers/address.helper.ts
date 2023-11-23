import AuthHelper from '../components/auth/apis/helper';
import { IAddress } from '../components/user';

export const parseAddressFromLocalStorage = async () => {
  const user = AuthHelper.isSignedOn();
  const address = user?.address;
  return address;
};

export const parseSpecificAddressFromLocalStorage = ({ addressId }:any) => {
  const user = AuthHelper.isSignedOn();
  const address = user?.address;
  return address.find((item:IAddress) => item._id.toString() === addressId.toString());
};
