import { deleteReviewById } from '@/components/home/reviews/api/deleteReview';
import { ErrorResponse, FetchApiResponse, hasRequestSucceeded } from '@/types/Fetch';
import { ClientReview } from '@/types/Review';
import { useEffect, useState } from 'react';
import { calculateTotalPages, decrementReviewCount, removeReview } from '@/utils/reduxSlice/reviewSlice';
import { toast } from 'react-toastify';
import { useTypedDispatch } from './user/reduxHooks';
import 'react-toastify/dist/ReactToastify.css';

type DeleteReviewProps = { deleteReview:boolean, review:ClientReview, userId:string | undefined };
const useDeleteReview = ({ deleteReview, review, userId }:DeleteReviewProps) => {
  const dispatch = useTypedDispatch();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (deleteReview) {
      setLoading(true);
      deleteReviewById(review._id, review.productId)
        .then((result:FetchApiResponse<{ comment:string }> | ErrorResponse) => {
          setLoading(false);
          if (hasRequestSucceeded(result)) {
            if (userId) {
              dispatch(removeReview(userId));
              dispatch(decrementReviewCount());
              dispatch(calculateTotalPages());
              toast.success('Your review deleted successfully', { position: 'bottom-center' });
            }
          } else {
            toast.error('Failed to delete the review', { position: 'bottom-center' });
          }
        })
        .catch(() => {
          setLoading(false);
          toast.error('Failed to delete the review', { position: 'bottom-center' });
        });
    }
  }, [deleteReview, dispatch, review._id, review.productId, userId]);
  return { loading };
};

export default useDeleteReview;
