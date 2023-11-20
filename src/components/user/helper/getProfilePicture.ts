import { IUser } from '..';

export const profilePicture = {

  getImage: () => {
    if (typeof window !== 'undefined' && localStorage.getItem('user')) {
      const user = localStorage.getItem('user');
      if (typeof user === 'string') {
        const userObj = JSON.parse(user);
        return userObj.photo;
      }
    }
    return false;
  },
  removeImage: (cb:()=>void) => {
    if (typeof window !== 'undefined' && localStorage.getItem('user')) {
      const user = localStorage.getItem('user');
      if (typeof user === 'string') {
        const userObj:IUser = JSON.parse(user);
        delete userObj.photo;
        localStorage.setItem('user', JSON.stringify(userObj));
      }
      cb();
    }
  },
};
