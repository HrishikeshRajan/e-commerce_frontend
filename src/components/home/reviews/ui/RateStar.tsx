import { uniqueId } from 'lodash';
import { FaStar } from 'react-icons/fa';

type RateStarProps = { rating:number, setRating:(rating:number) => void, className:string };
export function RateStar({ rating, setRating, className }:RateStarProps) {
  return (
    <div className={`${className}`}>
      {[...Array(5)].map((_, index) => {
        const currentrating = index + 1;
        return (
          <label
            aria-label={`${currentrating} star`}
            key={uniqueId()}
            onMouseEnter={() => setRating(currentrating)}
            onMouseLeave={() => setRating(rating ?? 0)}
          >
            <input type="radio" className="hidden" name="star" value={currentrating} onClick={() => setRating(currentrating)} />
            <FaStar size={20} className={`${currentrating <= rating ? 'text-yellow-500' : 'text-slate-300'}`} />
          </label>
        );
      })}
    </div>
  );
}
