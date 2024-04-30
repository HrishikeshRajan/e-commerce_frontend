import { useTypedSelector } from '@/hooks/user/reduxHooks';
import useCategory from '@/hooks/user/useCategories';
import MenuCard from './Menu/MenuCard';
import CategoryShimmer from '../shimmer/CategoryShimmer';

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
    <div className="top-full mt-20">
      {!error
      && (
        <>
          <h2 className="text-xl xl:text-4xl  text-orange-500 drop-shadow-lg text-center  lg:mt-28 p-10  font-bold">SHOP BY CATEGORY</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 xl:gap-0 xl:grid-cols-4  py-2 content-center   place-items-center ">
            {categories?.map((cate) => (
              <MenuCard
                name={cate.name}
                secure_url={cate.image.secure_url}
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
