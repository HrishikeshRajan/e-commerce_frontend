/* eslint-disable react/display-name */

/* eslint-disable jsx-a11y/img-redundant-alt */
import { Link } from 'react-router-dom';
import { ProductUser } from './types';
import Ratings from './Ratings';
import Para from '../CustomElements/Para';
import Span from '../CustomElements/Span';
import Div from '../CustomElements/Div';

const makeVariants = (url:string, width:number, height:number) => {
  const config = `c_fit,w_${width},h_${height},f_auto`;
  const parsed = url.split('/');
  parsed.splice(6, 0, config);
  return parsed.join('/');
};

type CardProps = Pick<ProductUser, 'name' | 'price' | 'brand' | '_id' | 'ratings' | 'images' | 'numberOfReviews' >;
function Card({
  name,
  price,
  brand,
  _id,
  numberOfReviews,
  ratings,
  images,
}:CardProps) {
  const formattedAmount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(parseFloat(price));

  return (
    <Link to={`/product/${_id}`} className="relative bg-white xl:rounded-xl flex-col shadow-md">
      <Div className="relative px-1 flex w-full justify-center  h-52 overflow-hidden ">
        <img className="object-cover " loading="lazy" src={(images && images[0].secure_url)} srcSet={`${makeVariants(images && images[0].secure_url, 200, 400)}`} alt="product image" />
      </Div>
      <Div className="mt-1 px-2 bg-white ">
        <Div className=" overflow-hidden ">
          <Para>
            {brand}
          </Para>
          <Para className="text-xs  text-slate-500 overflow-hidden overflow-ellipsis h-10 whitespace-nowrap">
            {name}
          </Para>
        </Div>

        <Div className="w-full mb-2 flex  items-start justify-between flex-col">
          <Para className="flex gap-1 items-center">
            <Span className="text-slate-400 text-xs ">
              MRP:
            </Span>
            <Span className="text-sm font-bold text-slate-700">
              {formattedAmount}
            </Span>
          </Para>
          <Div className="flex items-center my-1 text-xs">
            <Ratings ratings={ratings} />
            <Span className="mr-2 ml-3 rounded bg-yellow-200 px-1.5 py-0.5 text-xs font-semibold">
              {numberOfReviews}
            </Span>
          </Div>
        </Div>
      </Div>
    </Link>

  );
}

export default Card;
