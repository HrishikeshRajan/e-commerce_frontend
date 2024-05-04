import { bannerMain, bannerVariants } from './constants';

function Banner() {
  return (
    <div className="relative ">
      <div className="xl:hidden">

        <img
          src={bannerMain}
          className="lg:block  w-full object-cover "
          alt="wallpaper"
          srcSet={bannerVariants}
          sizes="100vw"
        />
      </div>
    </div>
  );
}

export default Banner;
