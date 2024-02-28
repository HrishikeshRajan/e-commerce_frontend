import React from 'react';

type Status = {
  signIn: boolean;
  changeSignIn: React.Dispatch<React.SetStateAction<boolean>>;
};
function DontHaveAccount(props: Status) {
  return (
    <div className="flex justify-center w-full my-2">
      <p className="select-none font-light pr-1">Don&apos;t have an Account ?</p>
      <button
        type="button"
        data-testid="DHA"
        onClick={() => props.changeSignIn(!props.signIn)}
        className="font-semibold text-blue-500"
      >
        Sign up
      </button>
    </div>
  );
}

export default DontHaveAccount;
