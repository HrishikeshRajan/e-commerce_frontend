import { useTypedSelector } from '@/hooks/user/reduxHooks';
import useCategory from '@/hooks/user/useCategories';
import MenuCard from './Menu/MenuCard';
import CategoryShimmer from '../shimmer/CategoryShimmer';

const makeVariants = (url:string, width:number, height:number) => {
  const config = `c_scale,w_${width},h_${height}`;
  const parsed = url.split('/');
  parsed.splice(6, 0, config);
  return parsed.join('/');
};

function Categories() {
  const [error] = useCategory();

  const categories = useTypedSelector((store) => store.products.categories);
  if ((categories && categories.length < 1 && true)) {
    return (
      <CategoryShimmer />
    );
  }
  if (error) {
    return null;
  }

  return (
    <div className="">
      {!error
      && (
        <>
          <h2 className="text-xl xl:text-4xl  headingDecorator  text-orange-500 drop-shadow-lg text-center  lg:mt-28 p-10  font-bold">OUR CATEGORY</h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 xl:flex xl:flex-wrap xl:justify-center xl:gap-0 xl:grid-cols-4  py-2">
            {categories?.map((cate) => (
              <MenuCard
                name={cate.name}
                secure_url={cate.image.secure_url}
                variants={`${makeVariants(cate.image.secure_url, 412, 618)}`}
                key={cate._id}
                offer={cate.offer}
              />
            ))}
          </div>
        </>
      )}

    </div>
  );
}

export default Categories;
