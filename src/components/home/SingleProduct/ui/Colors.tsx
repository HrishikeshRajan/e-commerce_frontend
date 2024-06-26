import convert from 'color-convert';
import { useTypedDispatch, useTypedSelector } from '@/hooks/user/reduxHooks';
import { updateCartItemColor } from '@/utils/reduxSlice/cartSlice';

function Colors({ color, productId }:{ color:string, productId:string }) {
  const dispatch = useTypedDispatch();
  const isColorSelected = useTypedSelector((store) => store.products.selectedColor);
  const handleColor = () => {
    dispatch(updateCartItemColor({ color, productId }));
  };
  return (
    <>
      <h4 className="mt-4 font-bold text-slate-500">SELECT COLOR</h4>
      <div className="flex bg-white items-center my-5">

        <input type="radio" onChange={handleColor} name="color" id={color} className={`w-5 h-5 accent-black  bg-white rounded-lg ${!isColorSelected ? 'border border-red-500' : 'border-white'}`} />
        <label
          htmlFor={color}
          className="pl-2 text-slate-400 flex gap-2 select-none"
        >
          <button type="button" aria-label="Save" className="w-5 h-5 rounded-full" style={{ backgroundColor: `#${convert.rgb.hex(convert.keyword.rgb(color.toLocaleLowerCase() as unknown as any))}` }} />
          {color}
        </label>

      </div>
    </>
  );
}

export default Colors;
