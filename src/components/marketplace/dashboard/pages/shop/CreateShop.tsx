import React from 'react';
import useClearShop from '@/hooks/user/useClearShop';
import AddForm from '../../ui/forms/AddForm';

function CreateShop() {
  useClearShop();

  return (
    <div className="w-full sm:w-8/12">
      <AddForm />
    </div>
  );
}

export default CreateShop;
