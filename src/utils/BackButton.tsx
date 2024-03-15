import Button from '@/components/auth/ui/Button';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function BackButton({ children }:{ children:React.ReactNode }) {
  const navigate = useNavigate();
  return (
    <Button
      mode="idle"
      type="button"
      disabled={false}
      className="w-full  shadow-lg  xl:hidden sm:mt-28 font-bold mb-5 flex justify-center gap-2 p-3 items-center text-slate-500"
      onClick={() => navigate(-1)}
    >
      {children}
    </Button>
  );
}

export default BackButton;
