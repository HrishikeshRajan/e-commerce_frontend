import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  ElementRef, useRef, useState,
} from 'react';
import { CiSearch } from 'react-icons/ci';
import { useSearchParams } from 'react-router-dom';
import useDebounce from '@/hooks/useDebounce';
import { TbFaceIdError } from 'react-icons/tb';
import useOutsideClickListner from '@/hooks/useOutsideClickListner';
import useSearchProducts from '@/hooks/useSearchProducts';
import useSearchSuggestion from '@/hooks/useSearchSuggestion';
import { useTypedDispatch, useTypedSelector } from '@/hooks/user/reduxHooks';
import { toggleSearchSuggstionList } from '@/utils/reduxSlice/productSlice';
import { SearchSuggestionShimmer } from '../shimmer/SearchSuggestionShimmer';
import ListWrapper from '../CustomElements/List/ListWrapper';
import ListItem from '../CustomElements/List/ListItem';

function Search() {
  const [word, setWord] = useState('');
  const [search, setSearch] = useSearchParams();
  const isSuggestionOpen = useTypedSelector((store) => store.products.isSearchSuggestionOpen);
  const dispatch = useTypedDispatch();
  const handleClick = () => {
    search.delete('category');
    search.delete('brand');
    search.delete('color');
    search.delete('sort');
    search.delete('page');
    search.delete('price[gte]');
    search.delete('price[lte]');
    search.delete('name');
    search.set('name', word);
    setSearch(search, { replace: true });
    setWord('');
  };

  const {
    getSuggestions,
    suggestions,
    suggestionLoading,
    suggestionError,
  } = useSearchSuggestion(word);
  useDebounce(getSuggestions, 200, word);

  // useSyncSearchWithSearchParams(word);

  const { searchError } = useSearchProducts();
  const refListError = useRef<ElementRef<'ul'>>(null);
  const refList = useRef<ElementRef<'ul'>>(null);
  useOutsideClickListner([refList], (e: MouseEvent) => {
    if (refList && refList.current) {
      if (!refList.current.contains(e.target as Node)) {
        dispatch(toggleSearchSuggstionList(false));
      }
    }
  });
  useOutsideClickListner([refListError], (e: MouseEvent) => {
    if (refListError && refListError.current) {
      if (!refListError.current.contains(e.target as Node)) {
        dispatch(toggleSearchSuggstionList(false));
      }
    }
  });
  return (
    <div className=" h-10 w-full relative flex items-center p-2 text-gray-400 focus-within:text-gray-600">
      <input
        type="text"
        name="search"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        placeholder="Search products here"
        autoComplete="off"
        id="search"
        data-testid="searchbox-lg"
        className="w-full outline-none absolute   pl-10 bg-gray-100 py-2 pr-3 sm:text-sm sm:leading-6 rounded-xl"
      />
      { (suggestionError || searchError) && isSuggestionOpen && (
        <ListWrapper ref={refListError}>
          <ListItem className="text-xs text-red-500 p-1 flex items-center gap-2">
            <TbFaceIdError />
            { (suggestionError || searchError) }
          </ListItem>

        </ListWrapper>

      )}
      {suggestionLoading && (
        <ListWrapper>
          <SearchSuggestionShimmer />
        </ListWrapper>

      )}
      {suggestions && suggestions.length && isSuggestionOpen && (
        <ListWrapper ref={refList}>
          <ListItem>
            matched results
          </ListItem>

          {suggestions.map((suggestion) => (
            <ListItem key={suggestion.refIndex} className="p-1 flex items-center justify-between">
              <button type="button" className="flex items-center overflow-x-hidden  justify-start gap-2 w-full " onClick={() => setWord(suggestion.item.name)}>
                <CiSearch />
                <span className="w-10/12 overflow-x-hidden text-left whitespace-nowrap  overflow-ellipsis">
                  {suggestion.item.name}
                </span>

              </button>
              <small className="text-xs w-3 h-3 flex items-center text-slate-500">
                (
                {suggestion.item.count}
                )
              </small>
            </ListItem>
          ))}
        </ListWrapper>
      )}
      <FontAwesomeIcon icon={faMagnifyingGlass} onClick={handleClick} className="absolute left-0 ml-5 cursor-pointer" size="lg" />
    </div>
  );
}

export default Search;
