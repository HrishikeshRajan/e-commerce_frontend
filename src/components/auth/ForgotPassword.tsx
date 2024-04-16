import { useNavigate } from 'react-router-dom';
import Button from './ui/Button';

function ForgotPassword() {
  const navigate = useNavigate();

  function navigateHandler():void {
    navigate('/forgotpassword');
  }
  return (
    <Button
      mode="idle"
      className="mt-5  text-sm font-bold text-slate-800"
      type="button"
      disabled={false}
      onClick={() => navigateHandler()}
    >
      Forgot password ?
    </Button>

  );
}

export default ForgotPassword;
