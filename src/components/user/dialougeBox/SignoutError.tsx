import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signout } from '../../auth/apis/signout';

interface IDialougeBox {
  clearError ():void
}
function SignoutError({ clearError }:IDialougeBox) {
  const navigate = useNavigate();
  const handleSignout = async () => {
    await signout().then((response) => {
      if (response.statusCode === 200) {
        navigate('/auth');
      }
    });
  };

  return (
    <div className="absolute inset-0 backdrop-blur-sm ">
      <div className=" w-11/12  lg:w-4/12 h-36 border-2 bg-white  border-gray-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col py-10 px-2 justify-center items-center ">
        <h2 className="text-lg font-bold mt-1">Error</h2>
        <p className="text-gray-600 my-6 font-semibold text-xs">Something went wrong, let&apos;s try again</p>
        <div className=" w-full  py-1 px-5 flex justify-evenly items-center">
          <button type="button" onClick={clearError} className="w-1/3 p-2 font-bold text-xs bg-slate-200 hover:scale-105">Close</button>
          <button type="button" onClick={handleSignout} className="w-1/3 p-2 font-bold bg-green-200 hover:scale-105 text-xs">Retry</button>
        </div>
      </div>
    </div>
  );
}

export default SignoutError;
