import {
  isEmpty, isNull, isUndefined, merge,
} from 'lodash';
import { IAddress, IUser } from '../../user';

const AuthHelper = {
  add: (user: any) => {
    if (typeof window !== undefined) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  },
  authenticate: (status: boolean) => {
    if (typeof window !== undefined) {
      localStorage.setItem('authenticated', String(status));
    }
  },
  isLoggedIn: (): boolean => {
    if (typeof window !== undefined) {
      const status = (localStorage.getItem('authenticated')
          && JSON.parse(localStorage.getItem('authenticated')!))
        || null;
      if (status) {
        return true;
      }
    }
    return false;
  },
  updateAuthenticatedUserData: (user: IUser) => {
    if (typeof window !== undefined) {
      const oldUser = JSON.parse(localStorage.getItem('user') as string);

      if (isEmpty(oldUser) || isUndefined(oldUser) || isNull(oldUser)) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        merge(oldUser, { ...user });

        localStorage.setItem('user', JSON.stringify(oldUser));
      }
    }
  },
  removeAuthenticatedUserAddress: (id: string) => {
    if (typeof window !== undefined && localStorage.getItem('user')) {
      const oldUser = JSON.parse(localStorage.getItem('user') as string);

      oldUser.address = oldUser.address.filter(
        (item: IAddress) => item._id.toString() !== id.toString(),
      );

      localStorage.setItem('user', JSON.stringify(oldUser));
      return oldUser;
    }
  },
  updateUserAddressInLocalStorage: (address: IAddress, id: string) => {
    if (
      typeof window !== undefined
      && address
      && localStorage.getItem('user')
    ) {
      const oldUser = JSON.parse(localStorage.getItem('user') as string);

      const modifiedUser = oldUser.address.map((item: IAddress) => {
        if (item._id.toString() === id.toString()) {
          return { ...item, ...address };
        }
        return item;
      });
      oldUser.address = modifiedUser;
      localStorage.setItem('user', JSON.stringify(oldUser));
      return modifiedUser;
    }
  },
  pushAuthenticatedUserAddress: (address: IAddress[], cb: VoidFunction) => {
    if (
      typeof window !== undefined
      && address !== undefined
      && localStorage.getItem('user')
    ) {
      const oldUser = JSON.parse(localStorage.getItem('user') as string);
      if (oldUser && oldUser?.address !== undefined) {
        oldUser?.address.push(address);
        localStorage.setItem('user', JSON.stringify(oldUser));
      }
    }
    cb();
  },
  getUserFromLocalStorage(): IUser | null {
    try {
      if (typeof window === undefined) {
        return null;
      }
      if (
        localStorage.getItem('user')
        && typeof localStorage.getItem('user') === 'string'
      ) {
        return JSON.parse(localStorage.getItem('user') as string);
      }
      return null;
    } catch (error) {
      return null;
    }
  },
  isSignedOn() {
    try {
      if (typeof window === undefined) {
        return false;
      }
      if (
        localStorage.getItem('user')
        && typeof localStorage.getItem('user') === 'string'
      ) {
        return JSON.parse(localStorage.getItem('user') as string);
      }
    } catch (error) {
      return false;
    }
  },
  clearSignedOnData(cb?: () => void) {
    if (typeof window !== undefined) {
      localStorage.removeItem('user');
    }
    if (cb) {
      cb();
    }
  },
};

export default AuthHelper;
