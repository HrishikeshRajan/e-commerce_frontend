function CategoryShimmer() {
  return (
    <div className="w-full top-full mt-24 ">
      <div className="h-5 rounded-xl w-6/12 mx-auto self-center bg-slate-300" />
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2  xl:flex xl:flex-wrap xl:justify-center xl:gap-2 xl:grid-cols-4  py-2 ">
        {
          Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="relative bg-slate-200 min-h-full h-52 xl:h-72 xl:w-52 shadow-md  transition  ease-linear hover:scale-95 active:scale-105   border border-gray-200 rounded-lg " />
          ))
        }
      </div>
    </div>
  );
}

export default CategoryShimmer;
