import { faLinkSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Expired() {
  const naviagte = useNavigate();
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-full h-full lg:w-5/12  lg:h-3/4 flex justify-center flex-col relative items-center lg:rounded-lg bg-slate-700">

        <img src={import.meta.env.VITE_COMPANY_LOGO} alt="logo" className="w-10 h-10 absolute top-5 left-0 items-start ml-5 rounded" />

        <FontAwesomeIcon icon={faLinkSlash} className="text-white" size="8x" fade />
        <h1 className="font-extrabold text-4xl text-white my-3">Link Expired</h1>
        <button type="button" onClick={() => naviagte('/auth')} className="bg-white font-bold text-black p-3 rounded mt-10">Go to Login Page</button>
      </div>
    </div>
  );
}

export default Expired;
