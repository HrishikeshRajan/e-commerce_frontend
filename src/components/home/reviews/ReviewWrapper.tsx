import Div from '@/components/CustomElements/Div';
import H2 from '@/components/CustomElements/Headings/H2';
import { useTypedSelector } from '@/hooks/user/reduxHooks';
import Review from './Review';

function ReviewWrapper({ page }:{ page:number }) {
  const reviews = useTypedSelector((store) => store.review);
  const user = useTypedSelector((store) => store.app.user);
  return (
    <Div className="w-full pb-10">
      <H2 className="text-lg p-2 font-bold">
        User Reviews (
        {reviews.totalReviews ?? null}
        )
      </H2>
      <hr className="h-px my-8 bg-gray-200 border-0 " />
      <Div className="w-full flex flex-col justify-center">
        {reviews.reviews
        && Object.values(reviews.reviews).length > 0
         && Object.values(reviews.reviews).map((review) => (
           <Review
             key={review._id}
             review={review}
             userId={user?._id}
           />
         ))}
        <button type="button" disabled={page >= reviews.totalPages} className="border-2 p-2 mt-2 disabled:cursor-not-allowed disabled:bg-slate-200">
          {page >= reviews.totalPages ? 'No more reviews    ' : 'Show more'}
        </button>
      </Div>
    </Div>
  );
}

export default ReviewWrapper;
