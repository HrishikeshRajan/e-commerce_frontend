function CategoryShimmer() {
  return (
    <div className="w-full  flex justify-center items-center flex-col">
      <div className="text-xl w-6/12 xl:w-3/12 rounded-xl leading-relaxed animate-pulse bg-slate-400 mb-5 top-full mt-24 h-5  p-5" />
      <div className=" flex flex-wrap gap-2 p-2 justify-center">
        {
          Array.from({ length: 7 }, (_, index) => (
            <div key={index} className="relative bg-slate-300 w-36 h-72 lg:w-48 lg:h-96 transition delay-50 ease-linear rounded-lg shadow" />
          ))
        }
      </div>

    </div>
  );
}

export default CategoryShimmer;
