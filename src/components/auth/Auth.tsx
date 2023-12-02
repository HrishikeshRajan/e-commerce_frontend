import React, { useState } from 'react';
import Signin from './Signin';
import Signup from './Signup';
import DontHaveAccount from './DontHaveAccount';
import HaveAnAccount from './HaveAnAccount';
import useAuthPage from '../../hooks/user/useAuthPage';

function Auth() {
  const [signIn, setSignIn] = useState(true);
  useAuthPage();
  return (
    <div className=" h-screen absolute left-0 right-0 top-0 grid place-items-cente">
      <div className="  flex flex-col  w-full justify-center items-center mt-20">
        {signIn ? <Signin /> : <Signup />}
        <div className="flex w-full justify-center items-center text-center">
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
