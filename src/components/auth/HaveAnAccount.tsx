import React from 'react';

type Status = {
  signIn: boolean;
  changeSignIn: React.Dispatch<React.SetStateAction<boolean>>;
};

function HaveAnAccount(props: Status) {
  return (
    <div className="flex justify-center w-full  my-2">
      <p className="select-none font-light pr-1">Have an Account? </p>
      <button
        type="button"
        data-testid="DHA"
        onClick={() => props.changeSignIn(!props.signIn)}
        className="font-semibold text-blue-500"
      >
        &nbsp;Sign in here
      </button>
    </div>
  );
}

export default HaveAnAccount;
