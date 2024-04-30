/* eslint-disable import/no-extraneous-dependencies */
import useEmblaCarousel from 'embla-carousel-react';
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from 'react-icons/io';
import { usePrevNextButtons } from './usePrevNextButtons';

export function Slider({ children }:{ children:any }) {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <>
      <div className="text-black  justify-end w-full hidden xl:flex">
        <button
          type="button"
          className="embla__prev p-3  border-2 rounded-full disabled:bg-slate-200 "
          onClick={onPrevButtonClick}
          disabled={prevBtnDisabled}
          aria-label="previous"
        >
          <IoIosArrowRoundBack />
        </button>
        <button
          type="button"
          className="embla__next border-2 rounded-full p-3 disabled:bg-slate-200"
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
          aria-label="next"
        >
          <IoIosArrowRoundForward />
        </button>
      </div>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">{children}</div>
      </div>
    </>
  );
}
