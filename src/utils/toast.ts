import { Bounce, toast } from 'react-toastify';

export const notifyError = (msg:string) => toast.error(msg, {
  position: 'top-right',
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
  transition: Bounce,
});
