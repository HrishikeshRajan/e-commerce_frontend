/**
 * Form Label
 *
 */
function Label({ value, id }:{ value:string, id:string }) {
  return (
    <label htmlFor={id} className="text-slate-500 font-semibold mt-5 mb-2">{value}</label>
  );
}

export default Label;
