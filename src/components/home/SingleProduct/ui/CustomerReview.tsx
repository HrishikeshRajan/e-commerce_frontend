import React from 'react';

function CustomerReview({ numberOfReviews }:{ numberOfReviews:number }) {
  return (
    <>
      <small className="text-slate-500 mx-1">|</small>
      {'  '}
      <small className="text-slate-700">
        {' '}
        {numberOfReviews}
        {' '}
        Ratings
      </small>
    </>
  );
}

export default CustomerReview;
