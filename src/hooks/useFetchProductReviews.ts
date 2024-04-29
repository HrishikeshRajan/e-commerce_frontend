/* eslint-disable no-restricted-syntax */
import { getReviews } from '@/components/home/SingleProduct/api/getReviews';
import { useEffect, useState } from 'react';
import { ClientReview } from '@/types/Review';
import { setClientReviews, setTotalPagesCount, setTotalReviewsCount } from '@/utils/reduxSlice/reviewSlice';
import {
  ErrorResponse, FetchApiResponse, hasFetchSucceeded,
  isFetchInternalServerError,
  isFetchNotFoundError,
} from '@/types/Fetch';
import { useTypedDispatch } from './user/reduxHooks';
// import { useTypedDispatch, useTypedSelector } from './user/reduxHooks';

type ReviewsResponse = { comments:ClientReview[], totalPages:number, totalReviewsCount:number };
export const normalizeReviews = (reviews: ClientReview[]) => {
  const nomalizedData: Record<string, ClientReview> = {};

  for (const review of reviews) {
    nomalizedData[review.userId?._id] = review;
  }
  return nomalizedData;
};

const useFetchProductReviews = (productId: string, page: number) => {
  const [fetchUserReviewsError, setFetchUserReviewsError] = useState<string | null>(null);

  const dispatch = useTypedDispatch();
  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    getReviews(productId, page, signal)
      .then((result:FetchApiResponse<ReviewsResponse> | ErrorResponse) => {
        if (hasFetchSucceeded(result)) {
          dispatch(setClientReviews(normalizeReviews(result.message.comments)));
          dispatch(setTotalPagesCount(result.message.totalPages));
          dispatch(setTotalReviewsCount(result.message.totalReviewsCount));
        } else {
          if (isFetchNotFoundError(result)) {
            setFetchUserReviewsError('Something went wrong');
          }

          if (isFetchInternalServerError(result)) {
            setFetchUserReviewsError('Something went wrong');
          }
        }
      })
      .catch((err) => {
        console.log(err);
        setFetchUserReviewsError('sSomething went wrong');
      });

    return () => {
      abortController.abort();
    };
  }, [dispatch, page, productId]);

  return { fetchUserReviewsError };
};

export default useFetchProductReviews;
