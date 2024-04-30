/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
import { Link } from 'react-router-dom';

function MenuCard({ name, secure_url }:{ name:string, secure_url:string, offer?:string }) {
  return (

    <div className="relative min-h-full xl:h-96 shadow-md  transition delay-50 ease-linear hover:scale-90 active:scale-105   border border-gray-200 rounded-lg ">
      <Link to={{
        pathname: '/products',
        search: `?category=${name}`,
      }}
      >
        <img className="w-full h-full object-cover" src={secure_url} alt="" />

        <div className="bg-black text-center items-center flex flex-col  w-full absolute bottom-0 h-20 bg-opacity-80 ">
          <p className=" text-white  p-2 font-extrabold">{name}</p>
          <span className="text-white text-lg ">Shop Now</span>

        </div>
      </Link>
    </div>

  );
}

export default MenuCard;
