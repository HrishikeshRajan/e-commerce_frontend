/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-len */
import Div from '@/components/CustomElements/Div';
import H2 from '@/components/CustomElements/Headings/H2';
import Para from '@/components/CustomElements/Para';
import Ratings from '@/components/products/Ratings';
import { ClientReview } from '@/types/Review';
import { useState } from 'react';
import Span from '@/components/CustomElements/Span';

import { ToastContainer } from 'react-toastify';
import { MdDelete } from 'react-icons/md';
import { BiSolidCommentEdit } from 'react-icons/bi';
import useDeleteReview from '@/hooks/useDeleteReview';
import { RiDeleteBin6Fill } from 'react-icons/ri';

import 'react-toastify/dist/ReactToastify.css';
import Modal from '@/components/dialougeBox/Modal';
import { IoIosClose } from 'react-icons/io';
import moment from 'moment';
import EditForm from './ui/EditForm';

function Review({ review, userId }:{ review:ClientReview, userId:string | undefined }) {
  const [edit, setEdit] = useState(false);
  const [deleteReview, setDeleteReview] = useState(false);
  const cancel = () => setEdit(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  useDeleteReview({ deleteReview, review, userId });
  if (!review) return null;

  return (
    <>
      <Div className="shadow-md w-full xl:w-6/12 p-2">
        {!edit && (
          <>
            <Div className="flex gap-2 p-2 justify-start items-center">
              <img src={review.userId?.photo?.secure_url} alt="default icon" className="w-10 h-10 rounded-full" />
              <Para>{review.userId.fullname}</Para>
            </Div>
            <Div className="w-full ps-2">
              <small className="text-slate-500">
                Reviewed -
                <Span className="ps-1">{moment(new Date(review.createdAt)).fromNow()}</Span>
              </small>
              <H2 className="font-semibold text-base  items-center  gap-2 flex   w-full">
                <Ratings ratings={review.star} />
                <Span className="text-md truncate">{review.title}</Span>
              </H2>
              <Para className="font-normal text-sm py-3">{review.description}</Para>
            </Div>
          </>
        )}
        {edit && (
          <EditForm review={review} cancel={cancel} />
        )}
        <Div className="flex gap-2">
          {userId && !edit && <button type="button" onClick={() => setEdit(!edit)} className="p-1 text-slate-500 rounded-lg hover:scale-110 hover:text-slate-700" aria-label="edit review"><BiSolidCommentEdit /></button>}
          {userId && !edit && !deleteReview && <button type="button" onClick={toggleModal} className="p-1 text-slate-500 hover:scale-110 hover:text-slate-700 rounded-lg" aria-label="delete"><MdDelete /></button>}

        </Div>
      </Div>
      <ToastContainer />
      {isModalOpen && (
        <Modal className="rounded-xl flex flex-col py-10 px-5 " togglerFn={toggleModal}>
          <button
            aria-label="close modal"
            onClick={() => {
              toggleModal();
            }}
            className="absolute hover:scale-150 font-bold transition ease-linear top-0 p-2 right-0 "
            type="button"
          >
            <IoIosClose size={20} />
          </button>
          <RiDeleteBin6Fill size={48} className="text-red-500 mx-auto " />
          <H2 className="text-lg mt-5 font-bold mx-auto">Confirm Delete</H2>
          <p className=" text-slate-500 font-semibold px-2 text-center "> Are your sure you want to delete your review?</p>
          <div className="flex gap-2 mt-10 mx-auto">

            <button
              onClick={() => {
                setDeleteReview(true);
                toggleModal();
              }}
              className=" px-4 py-2 rounded-md outline-none shadow-md shadow-red-300 bg-red-600 font-bold text-white"
              type="button"
            >
              Delete
            </button>
            <button
              aria-label="close modal"
              onClick={() => {
                toggleModal();
              }}
              className=" px-4 py-2 rounded-md outline-none shadow-md  bg-slate-400 font-bold text-white"
              type="button"
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}

export default Review;
