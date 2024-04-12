/* eslint-disable import/order */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-unused-prop-types */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { deleteAddress } from '../apis/deleteAddress';
import AuthHelper from '../../auth/apis/helper';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { StatusCodes } from 'http-status-codes';
import { useTypedDispatch } from '../../../hooks/user/reduxHooks';
import { addUser } from '../../../utils/reduxSlice/appSlice';
import Modal from '@/components/dialougeBox/Modal';

interface IProps {
  address:any
}
function Address({ address }:IProps) {
  const dispatch = useTypedDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleDelete = () => {
    deleteAddress(address._id).then((response) => {
      if (response?.success && response?.statusCode <= StatusCodes.OK) {
        AuthHelper.removeAuthenticatedUserAddress(address._id);
        dispatch(addUser(response.message?.user));
        AuthHelper.updateAuthenticatedUserData(response.message?.user);
        toast.success('Successfully Deleted');
      } else {
        toast.error('Failed to deleted address');
      }
    });
  };

  return (
    <>
      <div className=" shadow-md px-5 w-full lg:w-5/12 py-3 rounded-xl  ">
        <div className="flex w-full justify-between">
          <div className="w-full">
            <h1 className="font-bold text-sm text-slate-800">{address.fullname}</h1>

          </div>
          <div className="w-20 flex my-2 items-center">
            <Link to={`edit/${address._id}`} className="px-2 mr-3 py-1 text-slate-600 rounded"><FontAwesomeIcon icon={faPenToSquare} /></Link>
            <button type="button" onClick={() => toggleModal()} className="px-2 py-1 mr-3 text-slate-600 rounded"><FontAwesomeIcon icon={faTrash} /></button>

          </div>
        </div>
        <hr />
        <address className="py-2">{address.homeAddress}</address>
        <p className="text-sm">{address.city}</p>
        <p className="text-sm">{address.phoneNo}</p>
        <p className="text-sm">{address.postalCode}</p>

        <p className="text-sm">{address.state}</p>
        <p className="text-sm">{address.country}</p>

      </div>
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
      {isModalOpen && (
        <Modal className="rounded-xl border-2 w-6/12" togglerFn={toggleModal}>
          <p className="py-4 text-slate-500 font-semibold"> Are you sure you want to delete this address?</p>
          <div className="flex gap-2 ">
            <button
              onClick={() => {
                toggleModal();
              }}
              className="border-2 px-4 py-2 rounded-xl bg-green-600 text-white font-bold"
              type="button"
            >
              Cancel
            </button>
            <button onClick={handleDelete} className="border-2 px-4 py-2 rounded-xl bg-red-600 font-bold text-white" type="button">Delete</button>

          </div>
        </Modal>
      )}
    </>
  );
}

export default Address;
