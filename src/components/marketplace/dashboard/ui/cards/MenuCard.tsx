function MenuCard({ children }:{ children:any }) {
  return (
    <div className="h-fit  rounded-xl flex gap-2 items-center  p-5 shadow-lg">
      {children}
    </div>
  );
}

export default MenuCard;
