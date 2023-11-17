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
  clearSignedOnData(cb:()=>void) {
    if (typeof window !== undefined) {
      localStorage.removeItem('user');
    }
    cb();
  },
};

export default AuthHelper;
