import Div from '@/components/CustomElements/Div';
import H2 from '@/components/CustomElements/Headings/H2';
import Para from '@/components/CustomElements/Para';
import Ratings from '@/components/products/Ratings';
import { ClientReview } from '@/types/Review';
import { defaultUser } from '@/utils/cloudinaryUrls';
import { useState } from 'react';
import Span from '@/components/CustomElements/Span';

import { ToastContainer } from 'react-toastify';
import { MdDelete } from 'react-icons/md';
import { BiSolidCommentEdit } from 'react-icons/bi';
import useDeleteReview from '@/hooks/useDeleteReview';
import EditForm from './ui/EditForm';
import 'react-toastify/dist/ReactToastify.css';

function Review({ review, userId }:{ review:ClientReview, userId:string | undefined }) {
  const [edit, setEdit] = useState(false);
  const [deleteReview, setDeleteReview] = useState(false);
  const cancel = () => setEdit(false);

  useDeleteReview({ deleteReview, review, userId });
  if (!review) return null;
  return (
    <>
      <Div className="shadow-md w-full xl:w-6/12 p-2">
        {!edit && (
          <>
            <Div className="flex gap-2 p-2 justify-start items-center">
              <img src={review.userId.photo.secure_url || defaultUser} alt="default icon" className="w-10 h-10 rounded-full" />
              <Para>{review.userId.fullname}</Para>
            </Div>
            <Div className="w-full ps-2">
              <small className="text-slate-500">
                Reviewed on
                <Span className="ps-2">{new Date(review.createdAt).toDateString()}</Span>
              </small>
              <H2 className="font-semibold text-base  gap-2 flex   w-full">
                <Ratings ratings={review.star} />
                <Span>{review.title}</Span>
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
          {userId && !edit && !deleteReview && <button type="button" onClick={() => setDeleteReview(!deleteReview)} className="p-1 text-slate-500 hover:scale-110 hover:text-slate-700 rounded-lg" aria-label="delete"><MdDelete /></button>}

        </Div>
      </Div>
      <ToastContainer />
    </>
  );
}

export default Review;
