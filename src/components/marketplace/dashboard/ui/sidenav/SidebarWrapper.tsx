/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import React, { useState } from 'react';
import Sidebar from '@/components/CustomElements/Sidebar/Sidebar';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '@/components/dialougeBox/Modal';
import { useDispatch } from 'react-redux';
import { removeAuthentication, removeUser } from '@/utils/reduxSlice/appSlice';
import AuthHelper from '@/components/auth/apis/helper';
import { signout } from '@/components/auth/apis/signout';
import { list, SidebarItemTypes } from './List';
import { hasChildren, isColletion, isOpen } from './helper';
import Submenu from './Submenu';

function SidebarWrapper() {
  const [menu, setMenu] = useState(list);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
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
      <Sidebar className="w-80 relative top-full mt-20 shadow-lg h-screen overflow-y-auto">
        <ul data-id="menu" className="flex flex-col justify-start absolute top-10 w-full px-5 ">
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