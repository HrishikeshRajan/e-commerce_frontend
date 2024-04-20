/* eslint-disable react/no-array-index-key */
import { useTypedDispatch } from '@/hooks/user/reduxHooks';
import { updateCartItemSize } from '@/utils/reduxSlice/cartSlice';

function Sizes({ sizes, productId }:{ sizes:string[], productId:string }) {
  const dispatch = useTypedDispatch();
  const handleSize = (size:string) => {
    dispatch(updateCartItemSize({ size, productId }));
  };
  return (
    <>
      <h4 className="mt-4 font-bold text-slate-500">SELECT SIZE</h4>
      <ul className="flex justify-start gap-4 mb-3 py-2">
        {sizes.map((item, index) => (
          <li key={index} className="flex items-center gap-1">
            <input type="radio" name="size" value={item} onChange={(e) => handleSize(e.target.value)} className="w-5 h-5 w accent-black border-white bg-white rounded-lg" />
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Sizes;
