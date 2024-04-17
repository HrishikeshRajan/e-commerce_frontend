/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
import { Link } from 'react-router-dom';

function MenuCard({ name, secure_url }:{ name:string, secure_url:string, offer?:string }) {
  return (

    <div className="relative w-36 h-72 lg:w-48 lg:h-96 transition delay-50 ease-linear hover:scale-105 active:scale-105   border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link to={{
        pathname: '/products',
        search: `?category=${name}`,
      }}
      >
        <img className="w-full h-full object-cover" src={secure_url} alt="" />

        <div className="bg-black text-center items-center flex flex-col p-2 w-full absolute bottom-0 h-1/4 bg-opacity-80 ">
          <p className=" text-white font-extrabold">{name}</p>
          <span className="text-white  mb-3 text-lg p-2">Shop Now</span>

        </div>
      </Link>
    </div>

  );
}

export default MenuCard;
