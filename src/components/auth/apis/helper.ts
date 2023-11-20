const AuthHelper = {
  authenticate: (user:any, cb:()=>void) => {
    if (typeof window !== undefined) {
      localStorage.setItem('user', JSON.stringify(user));
    }
    cb();
  },
  isSignedOn() {
    if (typeof window === undefined) {
      return false;
    } if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user') as string);
    }
    return false;
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
