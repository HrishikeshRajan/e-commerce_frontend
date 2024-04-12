/* eslint-disable max-len */
import ListItem from '@/components/CustomElements/List/ListItem';
import ListWrapper from '@/components/CustomElements/List/ListWrapper';
import { Button } from '@/components/ui/button';
import useDebounce from '@/hooks/useDebounce';
import { useTypedDispatch, useTypedSelector } from '@/hooks/user/reduxHooks';
import useSearchSuggestion from '@/hooks/useSearchSuggestion';
import { ProductCore } from '@/types/Product';
import { toggleSearchSuggstionList } from '@/utils/reduxSlice/productSlice';
import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';

function Items({
  productName, productId, tagProductId,
}:{ productName:string, productId:string, tagProductId:(e:React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <li className="flex gap-2 accent-black">
      <input type="checkbox" name="product" id="" onChange={(e) => tagProductId(e)} value={productId} />
      {productName}
    </li>
  );
}

// Now check will update value but uncheck is not updating
function ProductSelectBox({ tagProductId }:{ tagProductId:(e:React.ChangeEvent<HTMLInputElement>) => void }) {
  const [search, setSearch] = useState('');
  const [productsList, setProductsList] = useState<ProductCore[]>([]);
  const isSuggestionOpen = useTypedSelector((store) => store.products.isSearchSuggestionOpen);
  const dispatch = useTypedDispatch();
  async function handleSubmit(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    try {
      dispatch(toggleSearchSuggstionList(false));
      const result = await fetch(`http://localhost:4000/api/v1/product/search?name=${search}`);
      const response = await result.json();

      setProductsList([...response.message.products, ...productsList]);
    } catch (error) {
      console.log(error);
    }
  }
  const {
    getSuggestions,
    suggestions,
  } = useSearchSuggestion(search);
  useDebounce(getSuggestions, 200, search);

  return (
    <div className="w-full   rounded-xl ">
      <div className="flex flex-col relative">
        <div className="flex justify-between  items-center">
          <input type="search" value={search} placeholder="enter product name" onChange={(e) => setSearch(e.target.value)} className="outline-none p-2 rounded-lg" />
          <Button onClick={(e) => handleSubmit(e)} type="button">
            <CiSearch />
          </Button>
        </div>
        {suggestions && suggestions.length && isSuggestionOpen ? (
          <ListWrapper className="">
            <ListItem>
              matched results
            </ListItem>

            {suggestions.map((suggestion) => (
              <ListItem key={suggestion.refIndex} className="p-1 flex items-center justify-between">
                <button type="button" className="flex items-center overflow-x-hidden  justify-start gap-2 w-full " onClick={() => setSearch(suggestion.item.name)}>
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
        ) : ''}
        <div className="flex flex-col my-2 h-fit">
          {productsList && productsList.length > 0 && productsList.map((product) => <Items tagProductId={tagProductId} key={product._id} productName={product.name} productId={product._id} />)}
        </div>

      </div>
    </div>
  );
}

export default ProductSelectBox;
