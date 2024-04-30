function CategoryShimmer() {
  return (
    <div className="w-full top-full mt-24 ">
      <div className="h-5 rounded-xl w-6/12 mx-auto self-center bg-slate-300" />
      <div className="grid grid-cols-2 sm:grid-cols-3  gap-2   xl:gap-1 xl:grid-cols-4  py-2 content-center   place-items-center ">
        {
          Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="relative xl:scale-75 h-96 w-full    border border-gray-200 rounded-lg shadow-md bg-slate-200" />
          ))
        }
      </div>
    </div>
  );
}

export default CategoryShimmer;
