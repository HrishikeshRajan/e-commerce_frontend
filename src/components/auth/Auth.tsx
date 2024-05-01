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
        <div className="xl:hidden">

          <img
            src="https://res.cloudinary.com/dxv2tmvfw/image/upload/v1709130674/mintmade_fashion_1_2_qf6poe.png"
            className="lg:block  w-full object-cover "
            alt="wallpaper"
            srcSet="
           https://res.cloudinary.com/dxv2tmvfw/image/upload/w_285,h_160/v1709130674/mintmade_fashion_1_2_qf6poe.png 285w,
           https://res.cloudinary.com/dxv2tmvfw/image/upload/w_990,h_557/v1709130674/mintmade_fashion_1_2_qf6poe.png 990w,
           https://res.cloudinary.com/dxv2tmvfw/image/upload/w_1366,h_768/v1709130674/mintmade_fashion_1_2_qf6poe.png 1366w,
           https://res.cloudinary.com/dxv2tmvfw/image/upload/w_1740,h_978/v1709130674/mintmade_fashion_1_2_qf6poe.png 1740w,
           https://res.cloudinary.com/dxv2tmvfw/image/upload/w_2048,h_1151/v1709130674/mintmade_fashion_1_2_qf6poe.png 2048w
       "
            sizes="100vw"
          />
        </div>
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
