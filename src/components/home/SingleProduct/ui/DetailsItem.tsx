import { ReactNode } from 'react';

interface DetailsItemProps {
  name: string;
  children: ReactNode;
}
function DetailsItem({ name, children }: DetailsItemProps) {
  return (
    <li className="py-2 text-slate-700">
      <span>{`${name}: `}</span>
      {children}
    </li>
  );
}

export default DetailsItem;
