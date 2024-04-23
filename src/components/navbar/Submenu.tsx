/* eslint-disable no-nested-ternary */
/* eslint-disable no-bitwise */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, { useState } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { useTypedDispatch, useTypedSelector } from '@/hooks/user/reduxHooks';
import { resetUser } from '@/utils/reduxSlice/appSlice';
import { ToastContainer } from 'react-toastify';
import { resetCart } from '@/utils/reduxSlice/cartSlice';
import { resetMarketplace } from '@/utils/reduxSlice/markeplaceSlice';
import { resetOrders } from '@/utils/reduxSlice/orderSlice';
import { NavbarMenu } from '.';
import { signout } from '../auth/apis/signout';
import 'react-toastify/dist/ReactToastify.css';
import ListWrapper from '../CustomElements/List/ListWrapper';
import ListItem from '../CustomElements/List/ListItem';
import Modal from '../dialougeBox/Modal';
import AuthHelper from '../auth/apis/helper';

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
  // const notify = (message:string) => toast.error(message);
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Clears all user data from redux and local storage
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
              : user && user._id ? option.title !== 'Signin' && (option.title === 'Signout' ? <button type="button" className="text-black flex rounded-md p-2 hover:bg-slate-200 items-center space-x-2" onClick={toggleModal}>{option.title}</button> : <Link to={option.path} className="text-black flex rounded-md p-2 hover:bg-slate-200 items-center space-x-2" onClick={() => toggleOpen(option)}>{option.title}</Link>)
                : option.title !== 'Signout' && <Link to={option.path} className="text-black flex rounded-md p-2 hover:bg-slate-200 items-center space-x-2" onClick={() => toggleOpen(option)}>{option.title}</Link>}
            {option.submenu
                      && option.isOpen
                      && <Submenu menus={option.submenu} toggleOpen={toggleOpen} />}

          </ListItem>
        ))}
      </ListWrapper>
      {isModalOpen && (
        <Modal className="rounded-xl border-2 w-6/12" togglerFn={toggleModal}>
          <p className="py-4 text-slate-500 font-semibold"> Do you want to signout?</p>
          <div className="flex gap-2 ">
            <button
              onClick={() => {
                toggleModal();
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
      <ToastContainer hideProgressBar />
    </>
  );
}
