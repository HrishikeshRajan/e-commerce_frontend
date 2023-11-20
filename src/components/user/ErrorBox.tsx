import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface IDialougeBox {
  errorState: boolean
  message:string
  action: React.Dispatch<React.SetStateAction<{
    errorState: boolean;
    message: string;
    redirect: boolean;
  }>>
}
function ErrorBox(props:IDialougeBox) {
  return (
    <div className="absolute inset-0 backdrop-blur-sm ">
      <div className=" w-11/12  lg:w-4/12 h-36 border-2 bg-white  border-gray-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col py-10 px-2 justify-center items-center ">
        <h2 className="text-lg font-bold mt-1">
          <FontAwesomeIcon icon={faCircleExclamation} className="text-red-400 mx-1" />
          Error
        </h2>

        <p className="text-gray-600 my-3 font-semibold text-xs">{props.message}</p>
        <div className=" w-full  py-1 px-5 flex justify-evenly items-center">
          <button type="button" onClick={() => props.action({ errorState: !props.errorState, message: '', redirect: false })} className="w-1/3 p-2 font-bold text-xs bg-slate-200 hover:scale-105">Close</button>
        </div>
      </div>
    </div>
  );
}

export default ErrorBox;
