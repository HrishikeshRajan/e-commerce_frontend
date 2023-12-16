/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable import/no-cycle */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { setCurrentTab } from '@/utils/reduxSlice/markeplaceSlice';
import { useTypedDispatch, useTypedSelector } from 'hooks/user/reduxHooks';
import { SidebarItemTypes } from './constants';
import SubMenu from './Submenu';

type ItemPropTypes = {
  item:SidebarItemTypes
};

function Item({ item }:ItemPropTypes) {
  const [hasChildren, setHasChildren] = useState(false);
  const [open, setOpen] = useState(false);

  const marketStore = useTypedSelector((store) => store.marketplace);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    if (Array.isArray(item.children)) {
      setHasChildren(!hasChildren);
    }
  }, [item.children, item, hasChildren]);

  const handleItemClick = () => {
    if (hasChildren) {
      setOpen(!open);
    }
    dispatch(setCurrentTab(item.id));
  };

  return (
    <>
      <li onClick={handleItemClick} role="button">
        <Link
          to={item.path}
          className={`flex items-center justify-between p-2 text-gray-900 rounded-lg dark:text-white transition ease-in delay-100  ${(marketStore.currentTab === item.id) ? 'bg-gray-700' : ''} hover:bg-gray-100 dark:hover:bg-gray-700 group`}
        >
          <div className="flex item-center">
            <span className="flex items-center">
              {item.icon && <item.icon />}
            </span>
            <span className="ms-3">{item.title}</span>
          </div>

          {/** Display right arrow if item as children and open is false */}
          <div>
            {item?.childrenIcons && ((hasChildren && !open)
              ? <item.childrenIcons.arrowRight />
              : <item.childrenIcons.arrowDown />)}
          </div>

        </Link>

      </li>
      {/** Delegates children to this component */}
      {hasChildren && open && <SubMenu item={item.children} />}
    </>
  );
}

export default Item;
