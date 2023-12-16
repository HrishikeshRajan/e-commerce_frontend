/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { useTypedDispatch, useTypedSelector } from 'hooks/user/reduxHooks';
import SignoutDialougeBox from '@/components/dialougeBox/SignoutDialougeBox';
import { FaSignOutAlt } from 'react-icons/fa';
import { isEmpty } from 'lodash';
import { toggleSidebar, toggleSignout } from '@/utils/reduxSlice/appSlice';
import { menu } from './constants';
import ToggleButton from './ToggleButton';
import Item from './Item';
import defaultUser from '../../../../assets/defaultUser.png';

function Sidebar() {
  const user = useTypedSelector((store) => store.app.user);
  const isOpen = useTypedSelector((store) => store.app.sidebarIsOpen);
  const doSignout = useTypedSelector((store) => store.app.doSignout);
  const dispatch = useTypedDispatch();

  // This helps to close the tab for logout option
  useEffect(() => {
    dispatch(toggleSidebar());
  }, [dispatch, doSignout]);

  // Handles the cancel of dialouge box
  const clickSignout = ():void => {
    dispatch(toggleSignout());
  };

  return (
    <>
      <aside id="default-sidebar" className={`absolute sm:relative top-0 left-0 w-96 sm:w-3/12 z-40 h-screen shadow-md md:hidden  dark:bg-gray-800 transition-transform ${isOpen ? '-translate-x-0' : '-translate-x-full'}`} aria-label="Sidebar">

        {/* Profile image */}
        <div className="w-full flex flex-col justify-center items-center py-5">
          <img src={user?.photo?.secure_url ? user?.photo?.secure_url : defaultUser} className="w-20 h-20 rounded-full" alt="profileImage" />
          <span className="font-medium p-2 text-slate-100">{user?.fullname}</span>
        </div>
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">

          {/** Sidebar options */}
          <ul className="space-y-2 font-medium">
            {
              menu.map((item) => <Item key={item.id} item={item} />)
            }

          </ul>

          {/* Signout section */}
          {isEmpty(user) ? (
            <button
              type="button"
              className="flex gap-2 w-full font-medium items-center justify-start p-2 text-gray-900 rounded-lg dark:text-white transition ease-in delay-100 hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <FaSignOutAlt />
              Sign in
            </button>
          )
            : (
              <button
                type="button"
                className="flex w-full gap-2 font-medium items-center justify-start p-2 text-gray-900 rounded-lg dark:text-white transition ease-in delay-100 hover:bg-gray-100 dark:hover:bg-gray-700 group"
                onClick={() => dispatch(toggleSignout())}
              >
                <FaSignOutAlt />
                Sign out
              </button>
            )}
        </div>
      </aside>
      <ToggleButton />
      {doSignout && <SignoutDialougeBox handleSignout={clickSignout} />}
    </>
  );
}

export default Sidebar;
