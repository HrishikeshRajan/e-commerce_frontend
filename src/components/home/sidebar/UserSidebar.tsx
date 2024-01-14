import React, { useEffect, useState } from 'react';
import { ProductBaseUrl } from '@/utils/uri/productUri';
import Sidebar from './Sidebar';

function UserSidebar() {
  const [filter, setFilter] = useState<{ filter:any }>({ filter: {} });
  async function logMovies() {
    const response = await fetch(ProductBaseUrl('filter_menu'));
    const movies = await response.json();
    return movies;
  }

  useEffect(() => {
    try {
      logMovies().then((response) => {
        console.log(response);
        setFilter(response.message);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="w-96   absolute lg:relative">
      <Sidebar filter={filter.filter} />
    </div>
  );
}

export default UserSidebar;
