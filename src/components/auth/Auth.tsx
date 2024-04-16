import { useState } from 'react';
import Signin from './Signin';
import Signup from './Signup';
import DontHaveAccount from './DontHaveAccount';
import HaveAnAccount from './HaveAnAccount';
/**
 * @author Hrishikesh Rajan
 * @description - Component that conditionally renders one of two components based on state.
 * @returns React Component
 */

function Auth() {
/**
 * A state variable that determines which component to render.
 *
 * When `signIn` is true, the component renders the sign-in form.
 * When `signIn` is false, the component renders the sign-up form.
 *
 */
  const [signIn, setSignIn] = useState<boolean>(true);
  const toggleAuthState = () => setSignIn(!signIn);

  return (
    <div className="relative w-full bg-white">
      <div className="relative ">
        <picture className="xl:hidden">
          <source media="(min-width: 1280px)" className="lg:block  w-full   absolute bg-no-repeat object-scale-down max-h-full drop-shadow-md rounded-md m-auto" srcSet="https://res.cloudinary.com/dxv2tmvfw/image/upload/v1709130674/mintmade_fashion_1_2_qf6poe.png" />
          <img src="https://res.cloudinary.com/dxv2tmvfw/image/upload/v1709130674/mintmade_fashion_1_2_qf6poe.png" className="lg:block  w-full object-cover " alt="wallpaper" />
        </picture>
      </div>
      <div className=" w-full xl:mt-10 p-3 flex  flex-col justify-center xl:items-center gap-2 ">
        {signIn ? <Signin /> : <Signup toggleAuthState={toggleAuthState} />}
        <div className="flex  flex-col p-2 w-full xl:w-4/12 bg-white   rounded-xl justify-center  text-center">
          {signIn ? (
            <DontHaveAccount signIn={signIn} changeSignIn={setSignIn} />
          ) : (
            <HaveAnAccount signIn={signIn} changeSignIn={setSignIn} />
          )}
        </div>

      </div>
    </div>
  );
}

export default Auth;
