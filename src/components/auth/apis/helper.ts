import { Index } from '..';
import { IAddress, IUser } from '../../user';

const AuthHelper = {
  authenticate: (user:any, cb:()=>void) => {
    if (typeof window !== undefined) {
      localStorage.setItem('user', JSON.stringify(user));
    }
    cb();
  },
  updateAuthenticatedUserData: (user:IUser) => {
    if (typeof window !== undefined && localStorage.getItem('user')) {
      const oldUser = JSON.parse(localStorage.getItem('user') as string);
      const updated = { ...oldUser, ...user };
      localStorage.setItem('user', JSON.stringify(updated));
    }
  },
  removeAuthenticatedUserAddress: (id:string) => {
    if (typeof window !== undefined && localStorage.getItem('user')) {
      const oldUser = JSON.parse(localStorage.getItem('user') as string);

      oldUser.address = oldUser
        .address
        .filter((item: IAddress) => (item._id.toString() !== id.toString()));

      localStorage.setItem('user', JSON.stringify(oldUser));
      return oldUser;
    }
  },
  updateAuthenticatedUserAddress: (address:IAddress[], id:string) => {
    if (typeof window !== undefined && address !== undefined && localStorage.getItem('user')) {
      const oldUser = JSON.parse(localStorage.getItem('user') as string);
      const addressIndex: Index = {
        index: 0,
      };

      address?.find((item: IAddress, index) => {
        if (item._id.toString() === id.toString()) {
          addressIndex.index = index;
          return item;
        }
      });

      const updatedAddress = Object
        .assign(oldUser.address[addressIndex.index], address[addressIndex.index]);
      oldUser.address[addressIndex.index] = updatedAddress;

      localStorage.setItem('user', JSON.stringify(oldUser));
      return oldUser;
    }
  },
  pushAuthenticatedUserAddress: (address:IAddress[], cb:VoidFunction) => {
    if (typeof window !== undefined && address !== undefined && localStorage.getItem('user')) {
      const oldUser = JSON.parse(localStorage.getItem('user') as string);
      if (oldUser && oldUser?.address !== undefined) {
        oldUser?.address.push(address);
        localStorage.setItem('user', JSON.stringify(oldUser));
      }
    }
    cb();
  },

  isSignedOn() {
    try {
      if (typeof window === undefined) {
        return false;
      } if (localStorage.getItem('user') && typeof localStorage.getItem('user') === 'string') {
        return JSON.parse(localStorage.getItem('user') as string);
      }
    } catch (error) {
      return false;
    }
  },
  clearCookie: () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  },
  clearSignedOnData(cb:()=>void) {
    if (typeof window !== undefined) {
      localStorage.removeItem('user');
      this.clearCookie();
    }
    cb();
  },
};

export default AuthHelper;
