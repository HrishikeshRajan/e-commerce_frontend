/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { ShopCore, addShop, addShops } from 'utils/reduxSlice/markeplaceSlice';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineAdminPanelSettings, MdEdit, MdDelete } from 'react-icons/md';
import { CgCalendarDates } from 'react-icons/cg';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@/hooks/user/reduxHooks';
import ConfirmBox from '@/components/dialougeBox/ConfirmBox';
import { StatusCodes } from 'http-status-codes';
import { ToastContainer, toast } from 'react-toastify';
import { deleteShop } from '../../pages/shop/apis/deleteShop';
import defaultImage from '../../../../../assets/defaultUser.png';
import 'react-toastify/dist/ReactToastify.css';

type ShopCardPropTypes = {
  item:ShopCore
};
function ShopCard({ item }:ShopCardPropTypes) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const shops = useTypedSelector((store) => store.marketplace.shop.shops);
  const [isDelete, setDelete] = useState({
    deleteStatus: false,
    confirmDelete: false,
  });
  const handleEdit = () => {
    dispatch(addShop(item));
    navigate(`/marketplace/dashboard/shop/edit/${item._id}`);
  };

  const deleteShopById = () => {
    const shopId = item._id;
    const restShops = shops?.filter((shop) => shop._id !== shopId);
    dispatch(addShops(restShops));
    deleteShop(shopId).then((response) => {
      if (response.statusCode === StatusCodes.OK) {
        toast.success('Successfully Deleted');
      }
    }).catch((  ) => toast.success('Failed to Deleted'));
  };
  const handleDelete = () => {
    setDelete({
      deleteStatus: true,
      confirmDelete: false,
    });
  };
  return (

    <>
      <div className="w-full md:w-64 z-0 h-56 bg-slate-500 border border-gray-200 rounded-lg shadow  relative">
        <Link to="/">
          <img className="rounded-full m-1 w-10 h-10" src={item.logo.secure_url ?? defaultImage} alt="logo" />
        </Link>
        <div role="button" onClick={handleEdit} className="absolute top-0 right-0 m-2 text-slate-200 active:scale-110">
          <MdEdit />
        </div>
        <div role="button" onClick={handleDelete} className="absolute top-5 right-0 m-2 text-slate-200 active:scale-110">
          <MdDelete />
        </div>
        <div className="p-2 mb-4">
          <Link to="/">
            <h5 className="mb-1 text-lg font-bold tracking-tight text-gray-900 dark:text-white">{item.name}</h5>
          </Link>
          <p className="mb-3 font-normal text-gray-100 ">{item.description}</p>
          <Link to="/" className="inline-flex items-center px-2 py-2 text-sm font-bold text-center   rounded-lg bg-white text-slate-700 hover:scale-105">
            Visit
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </Link>
        </div>

        <div className="flex justify-between p-2">
          <small className="text-gray-100 font-normal flex gap-1 text-xs">
            <MdOutlineAdminPanelSettings />
            {`${item.owner.fullname}`}
          </small>
          <small className="font-normal text-gray-100 text-xs flex gap-2">
            <CgCalendarDates />
            {` ${new Date(item.created).toDateString()}`}
          </small>
        </div>
      </div>
      {isDelete.deleteStatus
     && (
       <ConfirmBox title={`Your shop ${item.name} will be deleted`}>
         <button type="button" onClick={() => setDelete({ deleteStatus: false, confirmDelete: false })} className="w-1/3 p-2 font-bold text-xs bg-slate-200 hover:scale-105">Cancel</button>
         <button type="button" onClick={deleteShopById} className="w-1/3 p-2 font-bold bg-red-500 hover:scale-105 text-xs">Delete</button>
       </ConfirmBox>
     )}
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>

  );
}

export default ShopCard;
