/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useTypedDispatch } from '@/hooks/user/reduxHooks';
import {
  resetUser,
} from '@/utils/reduxSlice/appSlice';

import { resetCart } from '@/utils/reduxSlice/cartSlice';
import { resetOrders } from '@/utils/reduxSlice/orderSlice';
import { resetMarketplace } from '@/utils/reduxSlice/markeplaceSlice';
import { FaSignOutAlt } from 'react-icons/fa';
import { IoIosClose } from 'react-icons/io';
import { options } from './Options';
import Modal from '../dialougeBox/Modal';
import { signout } from '../auth/apis/signout';
import AuthHelper from '../auth/apis/helper';

function Account() {
  const dispatch = useTypedDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const navigate = useNavigate();
  const [navs, setNavs] = useState(options);

  /**
   * Always clear client side data
   */
  const signOut = async () => {
    await signout().then(() => {
      AuthHelper.clearSignedOnData();
      dispatch(resetUser());
      dispatch(resetCart());
      dispatch(resetOrders());
      dispatch(resetMarketplace());
      navigate('/auth');
    });
  };
  const handleTabChange = (title:string) => {
    navs.map((item) => {
      if (item.title === title) {
        item.active = !item.active;
      } else {
        item.active = false;
      }
      return item;
    });
    setNavs([...navs]);
  };

  return (
    <>
      <div className=" md:top-full   left-0 w-full  flex flex-col mt-10  lg:mt-20 xl:flex-row  p-3 gap-2 min-h-screen">
        <div className=" w-full top-full mt-10 flex xl:flex-col  md:w-full xl:w-4/12">
          {navs.map((option) => {
            if (option.title === 'Signout') {
              return (
                <NavLink
                  key={option.id}
                  onClick={() => {
                    handleTabChange(option.title);
                    toggleModal();
                  }}
                  to={option.path}
                  className={`${option.active ? 'bg-slate-200 text-black' : 'bg-white'} h-14 rounded-sm flex  w-full items-center justify-center  xl:justify-start xl:ps-10 border-2 border-slate-100 text-slate-500 font-semibold`}
                >

                  <>
                    {option.icon && <option.icon />}
                    <p className="hidden xl:inline-block px-2">{option.title}</p>
                  </>

                </NavLink>
              );
            }
            return (
              <NavLink key={option.id} onClick={() => handleTabChange(option.title)} to={option.path} className={`${option.active ? 'bg-slate-200 text-black' : 'bg-white'} h-14 rounded-sm flex  w-full items-center justify-center  xl:justify-start xl:ps-10 border-2 border-slate-100 text-slate-500 font-semibold`}>

                <>
                  {option.icon && <option.icon />}
                  <p className="hidden lg:inline-block px-2">{option.title}</p>
                </>

              </NavLink>
            );
          })}

        </div>

        <Outlet />

      </div>
      {isModalOpen && (
        <Modal className="rounded-xl flex flex-col py-10 px-5 " togglerFn={toggleModal}>
          <button
            aria-label="close modal"
            onClick={() => {
              toggleModal();
            }}
            className="absolute hover:scale-150 font-bold transition ease-linear top-0 p-2 right-0 "
            type="button"
          >
            <IoIosClose size={20} />
          </button>
          <FaSignOutAlt size={42} className="text-slate-400 mx-auto " />
          <p className="py-4 text-slate-500 mx-auto font-semibold"> Are you sure you want to signout?</p>
          <div className="flex gap-2 mx-auto">
            <button
              onClick={() => {
                toggleModal();
              }}
              className="px-4 py-2 shadow-md shadow-green-400  outline-none  border-none rounded-xl bg-green-600 text-white font-bold hover:scale-110 transition ease-linear"
              type="button"
            >
              Cancel
            </button>
            <button onClick={signOut} className=" shadow-md shadow-red-400  outline-none  border-none px-4 py-2 rounded-xl bg-red-600 font-bold text-white hover:scale-110 transition ease-linear" type="button">Signout</button>

          </div>
        </Modal>
      )}
    </>
  );
}

export default Account;
