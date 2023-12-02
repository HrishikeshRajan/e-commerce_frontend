/* eslint-disable react/jsx-closing-tag-location */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { signout } from '../auth/apis/signout';
import SignoutError from './SignoutError';
import AuthHelper from '../auth/apis/helper';
import { usePageFreeze } from '../../hooks/user/usePageFreeze';
import { useTypedDispatch } from '../../hooks/user/reduxHooks';
import { removeAuthentication, removeUser } from '../../utils/reduxSlice/appSlice';

interface IDialougeBox {
  handleSignout():void
}

function SignoutDialougeBox({ handleSignout }:IDialougeBox) {
  const [error, setError] = useState(false);
  const dispatch = useTypedDispatch();
  const removeError = () => {
    setError(!error);
  };
  const navigate = useNavigate();

  /**
   * This hook hides the veritical scroll
   */
  usePageFreeze();

  const signOut = async () => {
    await signout().then((response) => {
      if (response.statusCode === 200) {
        AuthHelper.clearSignedOnData(() => {
          dispatch(removeUser());
          dispatch(removeAuthentication());
          navigate('/auth');
        });
      } else {
        setError(!error);
      }
    });
  };
  if (error) return <SignoutError clearError={removeError} />;
  return createPortal(
    <>
      <div className="fixed inset-0 backdrop-blur-sm "> </div>
      <div className=" w-11/12  lg:w-4/12 h-36 border-2 bg-white  border-gray-300 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col py-10 px-2 justify-center items-center ">
        <p className="text-gray-600 my-6 font-semibold text-xs">Are you sure you want to sign out ?</p>
        <div className=" w-full  py-1 px-5 flex justify-evenly items-center">
          <button type="button" onClick={handleSignout} className="w-1/3 p-2 font-bold text-xs bg-slate-200 hover:scale-105">No</button>
          <button type="button" onClick={signOut} className="w-1/3 p-2 font-bold bg-green-200 hover:scale-105 text-xs">Yes</button>
        </div>
      </div>
    </>,
    document.getElementById('dialougeBox')!,
  );
}

export default SignoutDialougeBox;
