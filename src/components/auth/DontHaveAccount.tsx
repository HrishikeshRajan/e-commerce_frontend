import React from 'react';

type Status = {
  signIn: boolean;
  changeSignIn: React.Dispatch<React.SetStateAction<boolean>>;
};
function DontHaveAccount(props: Status) {
  return (
    <div className="flex justify-center w-full  lg:w-4/12 my-2">
      <p className="font-medium select-none  pr-1">Don&apos;t have an Account?</p>
      <button
        type="button"
        data-testid="DHA"
        onClick={() => props.changeSignIn(!props.signIn)}
        className="font-bold"
      >
        Sign up
      </button>
    </div>
  );
}

export default DontHaveAccount;
