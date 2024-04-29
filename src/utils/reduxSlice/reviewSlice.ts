/* eslint-disable no-param-reassign */
import { ClientReview } from '@/types/Review';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { merge } from 'lodash';

type InitialState = {
  reviews: Record<string, ClientReview>;
  totalReviews: number;
  totalPages: number;
};

const initialState:InitialState = {
  reviews: {},
  totalPages: 0,
  totalReviews: 0,
};
const reviewSlice = createSlice({
  name: 'reviewSlice',
  initialState,
  reducers: {
    setClientReviews: (state, action:PayloadAction<Record<string, ClientReview>>) => {
      merge(state.reviews, action.payload);
    },
    setTotalReviewsCount: (state, action:PayloadAction<number>) => {
      state.totalReviews = action.payload;
    },
    setTotalPagesCount: (state, action:PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    removeReview: (state, action:PayloadAction<string>) => {
      delete state.reviews[action.payload];
    },
    decrementReviewCount: (state) => {
      state.totalReviews -= 1;
    },
    calculateTotalPages: (state) => {
      const resultPerPage = 5;
      const totalPages = Math.ceil(state.totalReviews / resultPerPage);
      state.totalPages = totalPages;
    },
  },
});

export default reviewSlice.reducer;
export const {
  setClientReviews,
  setTotalPagesCount,
  setTotalReviewsCount,
  removeReview,
  decrementReviewCount,
  calculateTotalPages,
} = reviewSlice.actions;
