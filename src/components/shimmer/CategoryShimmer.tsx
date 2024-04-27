function CategoryShimmer() {
  return (
    <div className="w-full  top-full mt-24 ">
      <div className="h-5 rounded-xl w-6/12 mx-auto self-center bg-slate-300" />
      <div className="grid grid-cols-2  sm:grid-cols-4 gap-2 xl:gap-0 xl:grid-cols-5 p-2 items-center   place-items-center ">
        {
          Array.from({ length: 7 }, (_, index) => (
            <div key={index} className="relative bg-slate-300 w-full h-60 transition delay-50 ease-linear rounded-lg shadow" />
          ))
        }
      </div>
    </div>
  );
}

export default CategoryShimmer;
