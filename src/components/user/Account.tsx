/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useTypedDispatch } from '@/hooks/user/reduxHooks';
import { removeAuthentication, removeUser } from '@/utils/reduxSlice/appSlice';

import { signout } from '../auth/apis/signout';
import AuthHelper from '../auth/apis/helper';
import { options } from './Options';

function Account() {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const [navs, setNavs] = useState(options);
  const signOut = async () => {
    await signout().then(() => {
      AuthHelper.clearSignedOnData(() => {
        dispatch(removeUser());
        dispatch(removeAuthentication());
        navigate('/auth');
      });
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
    <div className=" md:top-10  left-0 w-full  flex flex-col  mt-10 lg:flex-row  p-3 gap-2">
      <div className=" w-full top-full mt-10 flex lg:flex-col  md:w-[300px] ">
        {
          navs.map((option) => (
            <NavLink key={option.id} onClick={() => handleTabChange(option.title)} to={option.path} className={`${option.active ? 'bg-slate-200 text-black' : 'bg-white'} h-14 rounded-sm flex  w-full items-center justify-center  xl:justify-start xl:ps-10 border-2 border-slate-100 text-slate-500 font-semibold`}>

              <>
                {option.icon && <option.icon />}
                <p className="hidden lg:inline-block px-2">{option.title}</p>
              </>

            </NavLink>
          ))
        }

      </div>

      <Outlet />

    </div>
  );
}

export default Account;
