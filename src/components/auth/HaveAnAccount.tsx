import React from 'react';

type Status = {
  signIn: Boolean;
  changeSignIn: React.Dispatch<React.SetStateAction<Boolean>>;
};

const HaveAnAccount: React.FC<Status> = (props: Status) => {
  return (
    <div className="flex justify-center w-full  lg:w-4/12 my-2">
      <p className="font-medium select-none pr-1">Have an Account? </p>

      <button
        onClick={() => props.changeSignIn(!props.signIn)}
        className="font-bold"
      >
        Sign in
      </button>
    </div>
  );
};

export default HaveAnAccount;
