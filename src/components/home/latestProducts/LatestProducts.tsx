/* eslint-disable react/jsx-props-no-spreading */
import Card from '@/components/products/Card';
import ProductSlider from '@/components/productSlider/ProductSlider';
import Loader from '@/components/ui/Loader';
import useLatestProducts from '@/hooks/useLatestProducts';

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
  return (
    <ProductSlider title="Latest Products">
      { products && products.map((item) => <Card key={item._id} {...item} />)}
    </ProductSlider>
  );
}

export default LatestProducts;
