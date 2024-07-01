/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import Card from '@/components/products/Card';
import ProductSliderCard from '@/components/productSlider/ProductSlider';
import Loader from '@/components/ui/Loader';
import useLatestProducts from '@/hooks/useLatestProducts';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function LatestProducts() {
  const { products, loading, error } = useLatestProducts();

  if (error || (products && products.length < 1)) return null;
  if (loading) {
    return (
      <div
        className="w-full top-full mt-20 relative h-56 sm:h-96 bg-slate-700 flex justify-center text-center items-center flex-col"
      >
        <Loader title="Looking for latest products for you" className="text-xl sm:text-3xl my-10 font-semibold text-slate-200" />
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <ProductSliderCard title="Latest Products">
      <Slider {...settings}>
        { products && products.map((item) => <Card key={item._id} {...item} />)}
      </Slider>
    </ProductSliderCard>
  );
}

export default LatestProducts;
