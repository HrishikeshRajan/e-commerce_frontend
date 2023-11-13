export const PORT = 4000;
export const baseURL = (port?: number) =>
  `http://localhost:${port || PORT}/api/v1/users`;
  
export const registerURL = () => baseURL() + '/register';
export const signinURL = () => baseURL() + '/login';
