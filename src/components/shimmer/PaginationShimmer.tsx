/* eslint-disable react/no-array-index-key */

function PaginationShimmer() {
  return (
    <div className="w-full flex  justify-center items-center my-5">
      <div className="p-5 bg-slate-200 animate-pulse mr-10 flex items-center" />
      {Array.from({ length: 10 }).map((_, index) => <div key={index} className="bg-slate-300  p-5 animate-pulse" />)}
    </div>
  );
}

export default PaginationShimmer;
