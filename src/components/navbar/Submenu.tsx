/* eslint-disable no-nested-ternary */
/* eslint-disable no-bitwise */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { useTypedDispatch, useTypedSelector } from '@/hooks/user/reduxHooks';
import { removeAuthentication, removeUser } from '@/utils/reduxSlice/appSlice';
import {
  ErrorResponse, FetchApiResponse, hasFetchSucceeded, isFetchUnauthorizedError,
} from '@/types/Fetch';
import { ToastContainer, toast } from 'react-toastify';
import { NavbarMenu } from '.';
import { signout } from '../auth/apis/signout';
import AuthHelper from '../auth/apis/helper';
import 'react-toastify/dist/ReactToastify.css';
import ListWrapper from '../CustomElements/List/ListWrapper';
import ListItem from '../CustomElements/List/ListItem';

type SubmenuProps = { menus:NavbarMenu[],
  toggleOpen:(optio:NavbarMenu) => void };

export function Submenu(
  { menus, toggleOpen }: SubmenuProps,
) {
  const user = useTypedSelector((store) => store.app.user);
  const handleKeyPress = (event:React.KeyboardEvent<HTMLParagraphElement>, opt:NavbarMenu) => {
    if (event.key === 'Enter' || event.key === ' ') {
      toggleOpen(opt);
    }
  };
  const notify = (message:string) => toast.error(message);
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  // Clears all user data from redux and local storage
  const signOut = () => {
    signout().then((result:FetchApiResponse<{ message:string }> | ErrorResponse) => {
      if (hasFetchSucceeded(result)) {
        AuthHelper.clearSignedOnData(() => {
          dispatch(removeUser());
          dispatch(removeAuthentication());
          AuthHelper.authenticate(false);
          navigate('/auth');
        });
      } else if (isFetchUnauthorizedError(result)) {
        AuthHelper.clearSignedOnData(() => {
          dispatch(removeUser());
          dispatch(removeAuthentication());
          AuthHelper.authenticate(false);
          navigate('/auth');
        });
      }
    }).catch((e) => {
      notify((e as Error).message);
    });
  };

  return (

    <>
      <ListWrapper className="bg-white  rounded-md pl-1 pe-1 py-1 shadow-md top-50 w-40 right-0 mr-1 absolute">

        {menus.map((option) => (
          <ListItem key={option.id} className="text-xs">
            {option.type === 'collection'
              ? (
                <p role="button" onKeyDown={(event) => handleKeyPress(event, option)} className="text-black w-full pl-2 rounded-md justify-between hover:bg-slate-200   flex items-center " onClick={() => toggleOpen(option)}>
                  {option.title}
                  {option.type === 'collection' ? (
                    <i className="w-10 h-10 flex items-center">
                      <MdArrowDropDown />
                      {' '}
                    </i>
                  ) : ''}
                </p>
              )
              : user && user._id ? option.title !== 'Signin' && (option.title === 'Signout' ? <Link to={option.path} className="text-black flex rounded-md p-2 hover:bg-slate-200 items-center space-x-2" onClick={signOut}>{option.title}</Link> : <Link to={option.path} className="text-black flex rounded-md p-2 hover:bg-slate-200 items-center space-x-2" onClick={() => toggleOpen(option)}>{option.title}</Link>)
                : option.title !== 'Signout' && <Link to={option.path} className="text-black flex rounded-md p-2 hover:bg-slate-200 items-center space-x-2" onClick={() => toggleOpen(option)}>{option.title}</Link>}
            {option.submenu
                      && option.isOpen
                      && <Submenu menus={option.submenu} toggleOpen={toggleOpen} />}

          </ListItem>
        ))}
      </ListWrapper>
      <ToastContainer hideProgressBar />
    </>
  );
}
