import React from 'react';
import { NavLink } from 'react-router-dom';

type IProps = {
  data: boolean;
  action: React.Dispatch<React.SetStateAction<boolean>>
};
function CreateAddressBtn({ data, action }:IProps) {
  return <NavLink to="add" onClick={() => action(!data)} className="p-3 bg-slate-400 my-4 rounded shadow-sm text-white font-bold active:scale-95">Create new address</NavLink>;
}

export default CreateAddressBtn;
