function FeaturedProducts({ children }:{ children:React.ReactNode }) {
  return (
    <div className="w-full h-fit py-5 border-2">
      <h1 className="text-xl font-bold border-b-2 text-slate-800 p-3">Featured Products</h1>
      <div className=" flex p-3">
        {children}
      </div>
    </div>
  );
}

export default FeaturedProducts;
