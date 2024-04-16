import { useNavigate } from 'react-router-dom';

function CreateAddressBtn() {
  const navigate = useNavigate();
  const redirect = () => navigate('add');
  return <button type="button" onClick={redirect} className="p-3 w-full bg-slate-400 my-4 rounded shadow-sm text-white font-bold active:scale-95">Create new address</button>;
}

export default CreateAddressBtn;
