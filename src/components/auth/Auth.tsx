import React, { useState } from 'react';
import { FcGoogle, FcManager } from 'react-icons/fc';
import Signin from './Signin';
import Signup from './Signup';
import DontHaveAccount from './DontHaveAccount';
import HaveAnAccount from './HaveAnAccount';
import useAuthPage from '../../hooks/user/useAuthPage';
import Button from './ui/Button';
/**
 * @author Hrishikesh Rajan
 * @description - Component that conditionally renders one of two components based on state.
 * @returns React Component
 */

function Auth():React.JSX.Element {
/**
 * A state variable that determines which component to render.
 *
 * When `signIn` is true, the component renders the sign-in form.
 * When `signIn` is false, the component renders the sign-up form.
 *
 */
  const [signIn, setSignIn] = useState<boolean>(true);
  const toggleAuthState = () => setSignIn(!signIn);

  // useAuthPage();
  return (
    <div className="relative   w-full bg-white">
      <div className="relative ">
        <picture className="xl:hidden">
          <source media="(min-width: 1280px)" className="lg:block  w-full   absolute bg-no-repeat object-scale-down max-h-full drop-shadow-md rounded-md m-auto" srcSet="https://res.cloudinary.com/dxv2tmvfw/image/upload/v1709130674/mintmade_fashion_1_2_qf6poe.png" />
          <img src="https://res.cloudinary.com/dxv2tmvfw/image/upload/v1709130674/mintmade_fashion_1_2_qf6poe.png" className="lg:block  w-full object-cover " alt="wallpaper" />
        </picture>
      </div>
      <div className=" w-full xl:h-screen p-3 flex xl:flex-row flex-col justify-center xl:items-center gap-2 ">
        {signIn ? <Signin /> : <Signup toggleAuthState={toggleAuthState} />}
        <span className="flex justify-center items-center font-semibold xl:text-slate-400 xl:p-2 border rounded-full p-1">OR</span>
        <div className="flex h-full flex-col p-2 w-full xl:w-4/12 bg-white   rounded-xl justify-center  text-center">
          {signIn ? (
            <DontHaveAccount signIn={signIn} changeSignIn={setSignIn} />
          ) : (
            <HaveAnAccount signIn={signIn} changeSignIn={setSignIn} />
          )}
          <Button
            type="button"
            className="mt-2 xl:mt-2 mb-5 rounded-lg hover:bg-slate-200 border active:transition active:duration-150 active:ease-in active:scale-95 bg-white shadow-sm p-3 flex items-center gap-2 justify-center text-base xl:text-xl font-light text-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            mode="idle"
            disabled={false}
          >
            continue with guest account
            <FcManager />
          </Button>
          <Button
            type="button"
            className="mt-2 xl:mt-2 mb-5 rounded-lg border hover:bg-slate-200 active:scale-95  bg-white shadow-sm p-3 flex items-center gap-2 justify-center text-base xl:text-xl font-light text-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            mode="idle"
            disabled={false}
          >
            continue with google
            <FcGoogle />
          </Button>
        </div>

      </div>
    </div>
  );
}

export default Auth;
