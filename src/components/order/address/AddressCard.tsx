import Modal from '@/components/dialougeBox/Modal';
import LineSmall from '@/components/home/ui/LineSmall';
import useReduxUserAddressListner from '@/hooks/user/useReduxUserListner';
import { Address } from '@/types/Orders';
import { deleteAddressById } from '@/utils/reduxSlice/appSlice';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

type AddressCardProps = {
  address:Address,
  selectedAddress:Address,
  setAddress:(add: Address) => void
};
function AddressCard({ address, selectedAddress, setAddress }:AddressCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useReduxUserAddressListner();
  const dispatch = useDispatch();

  if (!address) return;
  const handleDelete = () => {
    dispatch(deleteAddressById({ addressId: address._id }));
    toggleModal();
  };

  return (
    <>
      <div className="p-5 lg:p-3  w-full my-1 bg-white border-2 rounded-xl relative border-slate-100 shadow-sm">
        {address && <input type="radio" name="address" value={JSON.stringify(address)} checked={(selectedAddress && selectedAddress._id === address._id) || false} onChange={() => setAddress(address)} className="accent-gray-800 absolute top-0 left-0 m-3  w-3 h-3 " />}
        <h1 className="text-lg lg:text-base font-bold mt-5 lg:mt-5 text-slate-800">{address.fullname}</h1>
        <LineSmall />
        <p className="text-base lg:text-sm font-semibold text-slate-800">{address.homeAddress}</p>
        <p className="text-base lg:text-sm font-semibold text-slate-800">
          Mobile:
          {' '}
          {address.phoneNo}
        </p>
        <div className="flex justify-start gap-5 mt-5 lg:mt-3">
          <button type="button" className=" rounded-xl p-2 lg:p-1 border-2 text-slate-600 border-slate-200 text-xs font-semibold " onClick={toggleModal}>REMOVE</button>
          <Link to={`/account/address/edit/${address._id}`} className="px-2 mr-3 py-1 text-slate-600 rounded"><FontAwesomeIcon icon={faPenToSquare} /></Link>
        </div>
      </div>
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

export default AddressCard;
