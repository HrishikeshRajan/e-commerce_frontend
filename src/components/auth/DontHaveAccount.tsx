import React from 'react';

type Status = {
  signIn: Boolean;
  changeSignIn: React.Dispatch<React.SetStateAction<Boolean>>;
};
const DontHaveAccount: React.FC<Status> = (props: Status) => {
  return (
    <div className='flex justify-center w-full  lg:w-4/12 my-2'>
     <p className='font-medium select-none  pr-1'> Don't have an Account?</p>
      <button data-testid='DHA'  
      onClick={() => props.changeSignIn(!props.signIn)}
      className='font-bold'
      >Sign up</button>
    </div>
  );
};

export default DontHaveAccount;
