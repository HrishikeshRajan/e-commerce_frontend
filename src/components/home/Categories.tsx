import React from 'react';
import { useTypedSelector } from '@/hooks/user/reduxHooks';
import useCategory from '@/hooks/user/useCategories';
import MenuCard from './Menu/MenuCard';
import CategoryShimmer from '../shimmer/CategoryShimmer';

function Categories() {
  useCategory();

  const categories = useTypedSelector((store) => store.products.categories);
  if (categories && categories.length < 1) {
    return (
      <CategoryShimmer />
    );
  }

  return (
    <div className="w-full  h-screen relative">

      <h2 className="text-3xl  text-slate-700 mt-44 md:mt-52 lg:mt-44 p-5 lg:ms-20 font-normal">SHOP BY CATEGORY</h2>
      <div className="w-full flex flex-wrap gap-2 p-2 justify-center">
        {
          categories?.map((cate) => (
            <MenuCard
              name={cate.name}
              secure_url={cate.image.secure_url}
              key={cate._id}
              offer={cate.offer}
            />
          ))
        }
      </div>

    </div>
  );
}

export default Categories;
