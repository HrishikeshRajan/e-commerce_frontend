/* eslint-disable no-nested-ternary */
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Ratings({ ratings }:{ ratings:number }) {
  return (
    <span>
      {
        Array.from({ length: 5 }, (_, index) => {
          const mid = index + 0.5;
          return (
            <span key={index}>

              {
                ratings >= index + 1 ? (<FontAwesomeIcon icon={faStar} className="text-yellow-500" />)
                  : ratings >= mid ? (<FontAwesomeIcon icon={faStarHalfStroke} className="text-yellow-500" />)
                    : (<FontAwesomeIcon icon={faStar} className="text-slate-300" />)

              }

            </span>
          );
        })
      }
    </span>
  );
}

export default Ratings;
