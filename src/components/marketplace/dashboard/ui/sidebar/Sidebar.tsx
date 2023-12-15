/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { useTypedSelector } from 'hooks/user/reduxHooks';
import { menu } from './constants';
import SignoutDialougeBox from '../../../../dialougeBox/SignoutDialougeBox';
import ToggleButton from './ToggleButton';
import Item from './Item';
import defaultUser from '../../../../../assets/defaultUser.png';

function Sidebar() {
  const [signout, setSignOut] = useState(false);

  const user = useTypedSelector((store) => store.app.user);
  const isOpen = useTypedSelector((store) => store.app.sidebarIsOpen);

  const clickSignout = ():void => {
    setSignOut(!signout);
  };

  return (
    <>
      <aside id="default-sidebar" className={`absolute sm:relative top-0 left-0 w-96 sm:w-3/12 z-40 h-screen shadow-md   dark:bg-gray-800 transition-transform ${isOpen ? '-translate-x-0' : '-translate-x-full'} sm:translate-x-0`} aria-label="Sidebar">
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
        </div>
      </aside>
      <ToggleButton />
      {signout && <SignoutDialougeBox handleSignout={clickSignout} />}
    </>
  );
}

export default Sidebar;
