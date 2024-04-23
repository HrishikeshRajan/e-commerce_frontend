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
      className="w-full sticky top-0 left-0 right-0 z-50 bg-white   p-4  shadow-transparent gap-2 cursor-pointer  xl:hidden  font-bold  flex justify-center   items-center text-slate-500"
      onClick={() => navigate('/cart')}
    >
      {children}
    </Button>
  );
}

export default BackButton;
