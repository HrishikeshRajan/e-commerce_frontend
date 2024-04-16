import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons/faTriangleExclamation';
import { useTypedDispatch } from '../../hooks/user/reduxHooks';
import { removeUser } from '../../utils/reduxSlice/appSlice';
import AuthHelper from '../auth/apis/helper';

function ServiceUnavailable() {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const handleSignout = () => {
    AuthHelper.clearSignedOnData();
    dispatch(removeUser());
    navigate('/auth');
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-full h-full lg:w-5/12  lg:h-3/4 flex justify-center flex-col relative items-center lg:rounded-lg bg-slate-700">

        <img src={import.meta.env.VITE_COMPANY_LOGO} alt="logo" className="w-10 h-10 absolute top-5 left-0 items-start ml-5 rounded" />

        <FontAwesomeIcon icon={faTriangleExclamation} className="text-white" size="8x" fade />
        <h1 className="font-extrabold text-4xl text-white my-3">
          <span className="font-extrabold"> 503</span>
          Service Unavailable
        </h1>
        <button type="button" onClick={() => handleSignout} className="bg-white font-bold text-black p-3 rounded mt-10">Signout</button>
      </div>
    </div>
  );
}

export default ServiceUnavailable;
