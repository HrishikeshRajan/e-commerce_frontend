/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
import { Link } from 'react-router-dom';

type MenuCardProps = { name:string, secure_url:string, offer?:string, variants:string };
function MenuCard({ name, secure_url, variants }: MenuCardProps) {
  return (

    <div className="relative min-h-full h-52 xl:h-72 xl:w-52 shadow-md  transition  ease-linear hover:scale-95 active:scale-105   border border-gray-200 rounded-lg ">
      <Link to={{
        pathname: '/products',
        search: `?category=${name}`,
      }}
      >
        <img
          className="w-full h-full object-cover"
          src={secure_url}
          alt={`${name}`}
          srcSet={variants}
          loading="lazy"
        />

        <div className="bg-black text-center items-center flex flex-col  w-full absolute bottom-0 h-20 bg-opacity-80 ">
          <p className=" text-white  p-2 font-extrabold">{name}</p>
          <span className="text-white text-lg ">Shop Now</span>

        </div>
      </Link>
    </div>

  );
}

export default MenuCard;
