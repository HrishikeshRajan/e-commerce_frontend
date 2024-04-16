import { ReactNode } from 'react';

interface ItemProps {
  name: string;
  children: ReactNode;
}
function ListItem({ name, children }: ItemProps) {
  return (
    <li className="py-2 text-slate-700">
      <span>{`${name}: `}</span>
      {children}
    </li>
  );
}

export default ListItem;
