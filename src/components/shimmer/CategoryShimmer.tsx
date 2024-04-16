
function CategoryShimmer() {
  return (
    <div className="w-full  h-screen relative">

      <div className="text-3xl w-3/12 rounded leading-relaxed animate-pulse bg-slate-400 mb-5   mt-44 md:mt-52 lg:mt-44 h-12  p-5 lg:ms-20 font-normal" />
      <div className="w-full flex flex-wrap gap-2 p-2 justify-center">
        {
          Array.from({ length: 7 }, (_, index) => (
            <div key={index} className="relative bg-slate-300 w-44 h-72 transition delay-50 ease-linear hover:scale-105 active:scale-105   border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" />
          ))
        }
      </div>

    </div>
  );
}

export default CategoryShimmer;
