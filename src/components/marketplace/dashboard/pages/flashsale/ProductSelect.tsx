/* eslint-disable max-len */
import { Button } from '@/components/ui/button';
import { ProductCore } from '@/types/Product';
import React, { useState } from 'react';

function Items({ productName, productId, tagProductId }:{ productName:string, productId:string, tagProductId:(e:React.ChangeEvent<HTMLInputElement>) => void }) {
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
  const [products, setProducts] = useState<ProductCore[]>();
  async function handleSubmit(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    try {
      const result = await fetch(`http://localhost:4000/api/v1/product/search?name=${search}`);
      const response = await result.json();

      setProducts(response.message.products);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="w-full   bg-gray-100 rounded-xl p-5 ">
      <div className="flex flex-col">
        <div className="flex gap-2 items-center">
          <input type="search" placeholder="enter product name" onChange={(e) => setSearch(e.target.value)} className="outline-none p-2 rounded-lg" />
          <Button onClick={(e) => handleSubmit(e)} type="button">search</Button>
        </div>
        <div className="flex flex-col my-2 h-fit">
          {products && products.length > 0 && products.map((product) => <Items tagProductId={tagProductId} key={product._id} productName={product.name} productId={product._id} />)}
        </div>

      </div>
    </div>
  );
}

export default ProductSelectBox;
