/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useTypedDispatch, useTypedSelector } from '@/hooks/user/reduxHooks';
import { removeAuthentication, removeUser, toggleModal } from '@/utils/reduxSlice/appSlice';

import AuthHelper from '../auth/apis/helper';
import { options } from './Options';
import Modal from '../dialougeBox/Modal';
import { signout } from '../auth/apis/signout';

function Account() {
  const dispatch = useTypedDispatch();
  const modal = useTypedSelector((store) => store.app.modal);
  const navigate = useNavigate();
  const [navs, setNavs] = useState(options);

  /**
   * Always clear client side data
   */
  const signOut = async () => {
    await signout().then(() => {
      dispatch(removeUser());
      dispatch(removeAuthentication());
      navigate('/auth');
      AuthHelper.clearSignedOnData();
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
      <div className=" md:top-full   left-0 w-full  flex flex-col mt-10  lg:mt-20 lg:flex-row  p-3 gap-2">
        <div className=" w-full top-full mt-10 flex lg:flex-col  md:w-[300px] ">
          {navs.map((option) => {
            if (option.title === 'Signout') {
              return (
                <NavLink
                  key={option.id}
                  onClick={() => {
                    handleTabChange(option.title);
                    dispatch(toggleModal());
                  }}
                  to={option.path}
                  className={`${option.active ? 'bg-slate-200 text-black' : 'bg-white'} h-14 rounded-sm flex  w-full items-center justify-center  xl:justify-start xl:ps-10 border-2 border-slate-100 text-slate-500 font-semibold`}
                >

                  <>
                    {option.icon && <option.icon />}
                    <p className="hidden lg:inline-block px-2">{option.title}</p>
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
      {modal && (
        <Modal className="rounded-xl border-2 w-6/12">
          <p className="py-4 text-slate-500 font-semibold"> Do you want to signout?</p>
          <div className="flex gap-2 ">
            <button
              onClick={() => {
                dispatch(toggleModal());
              }}
              className="border-2 px-4 py-2 rounded-xl bg-green-600 text-white font-bold"
              type="button"
            >
              Cancel
            </button>
            <button onClick={signOut} className="border-2 px-4 py-2 rounded-xl bg-red-600 font-bold text-white" type="button">signout</button>

          </div>
        </Modal>
      )}
    </>
  );
}

export default Account;
