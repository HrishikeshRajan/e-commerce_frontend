/* eslint-disable max-len */
import { Link } from 'react-router-dom';
import { hasChildren, isColletion, isOpen } from './helper';
import { SidebarItemTypes } from './List';

type SubmenuProps = {
  submenu:SidebarItemTypes[],
  toggleSubmenu: (option: SidebarItemTypes[], title:string) => void };

function Submenu({ submenu, toggleSubmenu }:SubmenuProps) {
  return (
    <ul className="ml-2  bg-slate-200 p-1 rounded-xl w-full ">
      {submenu.map((option) => (
        <li key={option.id}>

          { isColletion(option) && hasChildren(option)
            ? (
              <button
                type="button"
                onClick={() => {
                  toggleSubmenu(submenu, option.title);
                }}
                className="w-full flex justify-between items-center font-bold border-2 bg-slate-200 text-left p-2 rounded-xl"
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
              <Link to={option.path} className="w-full flex hover:bg-slate-400 hover:rounded-xl  justify-start gap-2 items-center text-left p-2">
                {option.icon && <option.icon />}
                {option.title}
              </Link>
            ) }

          {isOpen(option) && hasChildren(option) && (
            <div className=" pr-10 rounded-xl">
              <Submenu submenu={option.children} toggleSubmenu={toggleSubmenu} />
            </div>
          ) }

        </li>
      ))}
    </ul>
  );
}

export default Submenu;
