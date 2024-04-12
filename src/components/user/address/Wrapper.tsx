import React from 'react';
import Address from './Card';
import AddButton from './AddButton';
import { IAddress } from '..';
import { useTypedSelector } from '../../../hooks/user/reduxHooks';
import List from './shimmer/List';

function AddressList() {
  const user = useTypedSelector((store) => store.app.user);

  if (!user) return <List />;
  return (
    <div className="flex flex-col p-4 h-fit  md:w-8/12 mx-auto xl:mx-0  ">
      <h1 className="text-2xl text-slate-800 font-bold  ">Manage Address</h1>
      <hr className="mb-10" />

      <AddButton />
      <div className="flex flex-wrap gap-2 justify-start">
        {user?.address
          && user.address.map((item:IAddress) => <Address key={item._id} address={item} />)}
      </div>
    </div>
  );
}

export default AddressList;
