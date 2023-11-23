import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signout } from '../../auth/apis/signout';
import SignoutError from './SignoutError';
import AuthHelper from '../../auth/apis/helper';

interface IDialougeBox {
  status: boolean;
  action: React.Dispatch<React.SetStateAction<boolean>>
}

function SignoutDialougeBox(props:IDialougeBox) {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSignout = async () => {
    await signout().then((response) => {
      if (response.statusCode === 200) {
        AuthHelper.clearSignedOnData(() => {
          navigate('/auth');
        });
      } else {
        setError(!error);
      }
    });
  };
  if (error) return <SignoutError status={props.status} action={props.action} />;
  return (
    <div className="absolute inset-0 backdrop-blur-sm ">
      <div className=" w-11/12  lg:w-4/12 h-36 border-2 bg-white  border-gray-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col py-10 px-2 justify-center items-center ">
        <p className="text-gray-600 my-6 font-semibold text-xs">Are you sure you want to sign out ?</p>
        <div className=" w-full  py-1 px-5 flex justify-evenly items-center">
          <button type="button" onClick={() => props.action(!props.status)} className="w-1/3 p-2 font-bold text-xs bg-slate-200 hover:scale-105">No</button>
          <button type="button" onClick={handleSignout} className="w-1/3 p-2 font-bold bg-green-200 hover:scale-105 text-xs">Yes</button>
        </div>
      </div>
    </div>
  );
}

export default SignoutDialougeBox;
