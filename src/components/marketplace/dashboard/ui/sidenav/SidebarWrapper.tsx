/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import React, { useState } from 'react';
import Sidebar from '@/components/CustomElements/Sidebar/Sidebar';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '@/components/dialougeBox/Modal';
import { removeAuthentication, removeUser, toggleSidebarMarketplace } from '@/utils/reduxSlice/appSlice';
import AuthHelper from '@/components/auth/apis/helper';
import { signout } from '@/components/auth/apis/signout';
import { useTypedDispatch, useTypedSelector } from '@/hooks/user/reduxHooks';
import { IconContext } from 'react-icons';
import { RxCross1 } from 'react-icons/rx';
import { list, SidebarItemTypes } from './List';
import { hasChildren, isColletion, isOpen } from './helper';
import Submenu from './Submenu';

function SidebarWrapper() {
  const sidebarOpen = useTypedSelector((store) => store.app.marketSidebar);
  const dispatch = useTypedDispatch();
  const [menu, setMenu] = useState(list);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const toggleSubmenu = (options: SidebarItemTypes[] | undefined, title:string) => {
    if (options) {
      options.map((item) => {
        if (item.title === title) {
          item.isOpen = !item.isOpen;
          item.isActive = !item.isActive;
          setMenu([...menu]);
          return item;
        }
        item.isOpen = false;
        item.isActive = false;
        setMenu([...menu]);
        toggleSubmenu(item.children, title);
        return item;
      });
    }
  };

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
  return (
    <>
      <Sidebar className={`${sidebarOpen ? 'w-11/12 h-screen  xl:w-4/12  top-0 left-0  z-50' : 'w-0 bg-white h-0 z-0  '} fixed z-50  shadow-lg  bg-white overflow-y-auto`}>
        <button type="button" aria-label="close" className="absolute top-6  xl:top-10 left-10 outline-none  " onClick={() => dispatch(toggleSidebarMarketplace())}>

          <IconContext.Provider value={{ className: 'text-black active:rotate-90', size: '30' }}>

            <RxCross1 />

          </IconContext.Provider>
        </button>
        <ul data-id="menu" className="flex  flex-col justify-start relative top-20 xl:top-20 w-full px-5 ">

          {menu.map((option) => (
            <li key={option.id}>

              { isColletion(option) && hasChildren(option)
                ? (
                  <button
                    type="button"
                    onClick={() => toggleSubmenu(menu, option.title)}
                    className={`${option.isActive ? 'bg-slate-300 rounded-xl' : ''} w-full outline-none flex justify-between gap-2 items-center hover:bg-slate-300 hover:rounded-xl my-2 font-bold  text-left p-2`}
                  >
                    <span className="flex justify-start items-center gap-2">
                      {option.icon && <option.icon />}
                      {option.title}
                    </span>
                    <span>
                      {option.childrenIcons && (option.isOpen ? <option.childrenIcons.arrowDown /> : <option.childrenIcons.arrowForward />) }

                    </span>
                  </button>
                )
                : (
                  option.title === 'Sign out' ? (
                    <button
                      type="button"
                      onClick={() => toggleModal()}
                      className={`${option.isActive ? 'bg-slate-300 rounded-xl' : ''} outline-none w-full flex justify-between gap-2 items-center hover:bg-slate-300 hover:rounded-xl my-2 font-bold  text-left p-2`}
                    >
                      <span className="flex justify-start items-center gap-2">
                        {option.icon && <option.icon />}
                        {option.title}
                      </span>
                    </button>
                  )
                    : (
                      <Link to={option.path} className={`${option.isActive ? 'bg-slate-300 rounded-xl' : ''} w-full flex hover:bg-slate-400 hover:rounded-xl justify-start gap-2 items-center text-left p-2`}>
                        {option.icon && <option.icon />}
                        {option.title}
                      </Link>
                    )
                ) }

              {isOpen(option) && hasChildren(option) && (

                <Submenu submenu={option.children} toggleSubmenu={toggleSubmenu} />

              ) }

            </li>
          ))}
        </ul>
      </Sidebar>
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
    </>
  );
}

export default SidebarWrapper;
