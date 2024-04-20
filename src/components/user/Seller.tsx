/* eslint-disable jsx-a11y/label-has-associated-control */
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { StatusCodes } from 'http-status-codes';
import { useTypedDispatch, useTypedSelector } from '../../hooks/user/reduxHooks';
import { upgradeToSeller } from '../../utils/reduxSlice/appSlice';
import { activateSeller } from './apis/addSeller';
import AuthHelper from '../auth/apis/helper';

function Marketplace() {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const user = useTypedSelector((store) => store.app.user);

  const goToDashboard = (path:string) => {
    navigate(path);
  };
  const handleChange = () => {
    const status = !user?.seller as boolean;
    if (user) {
      activateSeller(status, user?._id).then((response) => {
        if (response.statusCode === StatusCodes.OK && response.success) {
          dispatch(upgradeToSeller(response.message?.message.seller));
          AuthHelper.updateAuthenticatedUserData(response.message?.message);
        }
      });
    }
  };

  return (
    <div className="flex flex-col lg:px-10 mx-auto xl:mx-0">
      <h1 className=" text-2xl mt-5 lg:text-3xl text-slate-800 font-bold">Manage Marketplace</h1>
      <div className="flex flex-col">
        <h4 className=" text-slate-500 text-xl font-bold mt-10">Activate Seller Account</h4>
        <div className="flex flex-col">
          <span className="mt-4 text-sm font-medium text-gray-900 dark:text-gray-400">Upon activation of your seller account, you can now begin selling your products through your online shops.</span>

          <label htmlFor="checkbox" className="relative inline-flex mt-3 items-center cursor-pointer">
            <input id="checkbox" onChange={handleChange} type="checkbox" value="" className="sr-only peer" checked={!!user?.seller} />
            <div className="w-11 h-6 bg-gray-200  dark:peer-focus:ring-slate-600 rounded-full peer dark:bg-gray-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-0 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-0  after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-green-300" />
          </label>

        </div>
        <div>

          {user?.seller && (
            <button onClick={() => goToDashboard('/marketplace/dashboard')} className="mt-5 bg-sky-300 text-white font-bold shadow-md rounded px-3 py-2 active:scale-100" type="button">
              Marketplace Dashboard
              <FontAwesomeIcon className="mx-2" size="lg" icon={faArrowRight} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Marketplace;
