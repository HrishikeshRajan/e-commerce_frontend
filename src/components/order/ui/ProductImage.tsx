
function ProductImage({ url }:{ url:string }) {
  return (
    <img src={url} alt="product" className="scale-75 md:scale-75 object-cover p-2" />
  );
}

export default ProductImage;
