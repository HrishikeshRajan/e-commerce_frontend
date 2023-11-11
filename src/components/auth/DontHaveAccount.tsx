import React from 'react';

type Status = {
  signIn: Boolean;
  changeSignIn: React.Dispatch<React.SetStateAction<Boolean>>;
};
const DontHaveAccount: React.FC<Status> = (props: Status) => {
  return (
    <div >
      Don't have an Account?
      <button data-testid='DHA'  onClick={() => props.changeSignIn(!props.signIn)}>Sign up</button>
    </div>
  );
};

export default DontHaveAccount;
