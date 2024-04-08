/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable no-param-reassign */
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import React, { ElementRef, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Submenu } from './Submenu';
import { NavbarMenu, NavOptions } from '.';
import ListWrapper from './utils/ListWrapper';
import ListItem from './utils/ListItem';

export function Menu() {
  const [data, setData] = useState<NavbarMenu[]>(NavOptions);
  const refs = useRef<ElementRef<'p'>>(null);
  const subRef = useRef<ElementRef<'div'>>(null);
  const toggleOpen = (item:NavbarMenu) => {
    if (item.type === 'collection') {
      item.isOpen = !item.isOpen;
    }
    setData([...data]);
  };
  const closeAll = () => {
    const result = data.map((item) => {
      if (item.type === 'collection') {
        item.isOpen = false;
      }
      return item;
    });

    setData([...result]);
  };

  window.addEventListener('click', (e: MouseEvent) => {
    if (subRef && subRef.current) {
      if (!subRef.current.contains(e.target as Node)
        && !(refs && refs.current && refs.current.contains(e.target as Node))) {
        closeAll();
      }
    }
  });

  const handleKeyPress = (event:React.KeyboardEvent<HTMLParagraphElement>, opt:NavbarMenu) => {
    if (event.key === 'Enter' || event.key === ' ') {
      toggleOpen(opt);
    }
  };
  return (
    <ListWrapper className="navbar-nav hidden lg:flex items-center space-x-3 ">
      {data.map((opt) => (
        <ListItem key={opt.id} className="relative w-full ">
          {opt.type === 'collection' ? (
            <p
              role="button"
              onKeyDown={(event) => handleKeyPress(event, opt)}
              onMouseEnter={() => toggleOpen(opt)}
              ref={refs}
              className={`${opt.isOpen ? 'bg-white text-black px-2 m-0' : 'px-2 m-0'} text-xs font-semibold text-slate-700 rounded-xl flex items-center header `}
              onClick={() => toggleOpen(opt)}
            >
              {opt.title}
              {opt.isOpen ? (
                <i className="w-10 h-10 flex items-center">

                  <MdArrowDropUp />
                </i>
              ) : (
                <i className="w-10 h-10 flex items-center">
                  <MdArrowDropDown />
                </i>
              )}

            </p>
          )
            : <Link to={opt.path} className="text-black text-xs flex rounded-md p-2 hover:bg-slate-200 items-center space-x-2" onClick={() => toggleOpen(opt)}>{opt.title}</Link>}
          {opt.isOpen && opt.submenu && (
            <div className=" pr-10 rounded-xl" ref={subRef}>
              {opt.isOpen
                  && opt.submenu
                  && <Submenu menus={opt.submenu} toggleOpen={toggleOpen} />}
            </div>
          )}
        </ListItem>
      ))}
    </ListWrapper>

  );
}
