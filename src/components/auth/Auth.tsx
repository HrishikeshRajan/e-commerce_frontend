import React, { Fragment, useState } from 'react';
import Signin from './Signin';
import Signup from './Signup';
import DontHaveAccount from './DontHaveAccount';
import HaveAnAccount from './HaveAnAccount';

const Auth = () => {
  const [signIn, setSignIn] = useState<Boolean>(true);

  return (
    <Fragment>
      <div className='w-full h-screen flex justify-center items-center' >
        <div className='flex flex-col h-96 w-full justify-center items-center'>
          {signIn ? <Signin /> : <Signup />}
          <div className="auth-toggler">
            {signIn ? (
              <DontHaveAccount signIn={signIn} changeSignIn={setSignIn} />
            ) : (
              <HaveAnAccount  signIn={signIn} changeSignIn={setSignIn} />
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Auth;
