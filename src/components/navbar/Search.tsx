import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function Search() {
  const [word, setWord] = useState('');
  const [search, setSearch] = useSearchParams();
  const handleClick = () => {
    search.set('name', word);
    setSearch(search, { replace: true });
    setWord('');
  };

  return (
    <div className="  hidden relative lg:flex items-center justify-end p-2 text-gray-400 focus-within:text-gray-600">
      <input
        type="search"
        name="search"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        placeholder="Search products here"
        autoComplete="off"
        id="search"
        data-testid="searchbox-lg"
        className=" outline-none  min-w-lg  pl-10 bg-gray-100 py-3 pr-3 sm:text-sm sm:leading-6"
      />
      <FontAwesomeIcon icon={faMagnifyingGlass} onClick={handleClick} className="absolute left-0 ml-5 cursor-pointer" size="lg" />
    </div>
  );
}

export default Search;
