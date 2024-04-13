import { SidebarItemTypes } from './List';

export const isColletion = (option:SidebarItemTypes) => option.type === 'COLLECTION';
/**
 * Checks if th option has children property
 */
export const hasChildren = (
  option:SidebarItemTypes,
) :
    option is Required<SidebarItemTypes> => option !== undefined
 && option.children !== undefined
 && option.children.length > 0;

/**
 *
 * Determins the open and close status of submenu
 *
 */
export const isOpen = (option:SidebarItemTypes) => option.isOpen === true;
