import React from 'react';

type FormData = {
  type:string
};
type TypeSelectionProps<T> = {
  formData: T;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};
function TypeSelection<T extends FormData>({ formData, handleChange }:TypeSelectionProps<T>) {
  return (
    <label className="py-2 w-full gap-2 flex flex-col text-left  ">
      Type:
      <select name="type" className="outline-none p-2 rounded-lg " value={formData.type} onChange={handleChange}>
        <option value="">Select Type</option>
        <option value="PERCENTAGE">Percentage</option>
        <option value="FLAT">Flat</option>
        <option value="FREE SHIPPING">Free Shipping</option>
      </select>
    </label>
  );
}

export default TypeSelection;
