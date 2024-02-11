import React from 'react';
import { useNavigate } from 'react-router-dom';

function ContinueBtn() {
  const navigate = useNavigate();
  return (
    <button type="button" onClick={() => navigate('/payment')} className="bg-yellow-400 w-full lg:w-6/12 font-bold rounded text-slate-900 p-3">CONTINUE TO PAYMENT</button>
  );
}

export default ContinueBtn;
