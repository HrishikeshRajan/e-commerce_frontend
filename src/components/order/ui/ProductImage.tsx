/* eslint-disable react/require-default-props */
function ProductImage({ url, className }:{ url:string, className?:string }) {
  return (
    <img src={url} alt="product" className={`${className ?? 'scale-75 md:scale-75 object-cover p-2'}`} />
  );
}

export default ProductImage;
