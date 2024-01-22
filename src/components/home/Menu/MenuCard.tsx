/* eslint-disable react/require-default-props */
import React from 'react';
import { Link } from 'react-router-dom';

function MenuCard({ name, secure_url, offer = '' }:{ name:string, secure_url:string, offer?:string }) {
  return (

    <div className="relative w-44 h-fit transition delay-50 ease-linear hover:scale-105 active:scale-105   border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link to={{
        pathname: '/products',
        search: `?category=${name}`,
      }}
      >
        <img className="" src={secure_url} alt="" />

        <div className="bg-black text-center w-full absolute bottom-0 bg-opacity-80 ">
          <p className="   mb-3 text-white font-extrabold">{name}</p>
          {offer && <p className="  text-lg mb-3 text-white font-extrabold">{offer}</p>}
          <span className="text-white  mb-3 text-lg p-2">Shop Now</span>

        </div>
      </Link>
    </div>

  );
}

export default MenuCard;
