/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { useTypedDispatch, useTypedSelector } from 'hooks/user/reduxHooks';
import AuthHelper from '@/components/auth/apis/helper';
import { signout } from '@/components/auth/apis/signout';
import { removeUser, removeAuthentication } from '@/utils/reduxSlice/appSlice';
import { Link, useNavigate } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { menu } from './constants';
import ToggleButton from './ToggleButton';
import Item from './Item';
import defaultUser from '../../../../../assets/defaultUser.png';

function Sidebar() {
  const user = useTypedSelector((store) => store.app.user);
  const isOpen = useTypedSelector((store) => store.app.sidebarIsOpen);
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  // Only triggers when user clicks on confirm singout button (YES)
  const signOut = async () => {
    await signout().then(() => {
      AuthHelper.clearSignedOnData(() => {
        dispatch(removeUser());
        dispatch(removeAuthentication());
        navigate('/auth');
      });
    });
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
              menu.map((item) => {
                if (item.title.match(/sign out/gi) && !isEmpty(user)) {
                  return (
                    <li key={item.id} onClick={signOut} role="button">
                      <Link
                        to={item.path}
                        className="flex items-center justify-between p-2 text-gray-900 rounded-lg dark:text-white transition ease-in delay-100  hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      >
                        <div className="flex item-center">
                          <span className="flex items-center">
                            {item.icon && <item.icon />}
                          </span>
                          <span className="ms-3">{item.title}</span>
                        </div>

                      </Link>

                    </li>
                  );
                } if (item.title.match(/sign out/gi) && isEmpty(user)) {
                  return (
                    <li key={item.id} onClick={signOut} role="button">
                      <Link
                        to="/auth"
                        className="flex items-center justify-between p-2 text-gray-900 rounded-lg dark:text-white transition ease-in delay-100  hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      >
                        <div className="flex item-center">
                          <span className="flex items-center">
                            {item.icon && <item.icon />}
                          </span>
                          <span className="ms-3">SignIn</span>
                        </div>

                      </Link>

                    </li>
                  );
                }
                return <Item key={item.id} item={item} />;
              })
            }

          </ul>
        </div>
      </aside>
      <ToggleButton />
    </>
  );
}

export default Sidebar;
