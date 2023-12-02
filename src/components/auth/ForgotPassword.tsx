import React from 'react';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const naviagte = useNavigate();

  function naviagtehanlde() {
    naviagte('/forgotpassword');
  }
  return (
    <button type="button" className="my-2 text-sm font-bold text-slate-800" onClick={naviagtehanlde}>Forgot password ?</button>
  );
}

export default ForgotPassword;
