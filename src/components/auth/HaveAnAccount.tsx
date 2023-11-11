import React from 'react';

type Status = {
  signIn: Boolean;
  changeSignIn: React.Dispatch<React.SetStateAction<Boolean>>;
};

const HaveAnAccount: React.FC<Status> = (props: Status) => {
  return (
    <div>
      Have an Account?
      <button onClick={() => props.changeSignIn(!props.signIn)}>Sign in</button>
    </div>
  );
};

export default HaveAnAccount;
