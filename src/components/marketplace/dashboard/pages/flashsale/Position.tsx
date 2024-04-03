import { UploadFlashSale } from '@/types/Sale';
import React from 'react';

function Position({ formData, handleChange }:
{ formData:Partial<UploadFlashSale>,
  handleChange:(e:React.ChangeEvent<HTMLSelectElement>) => void }) {
  return (
    <label className="py-2 w-full gap-2 flex flex-col text-left ">
      Position:
      <select name="position" className="outline-none p-2 rounded-lg " value={formData.position} onChange={handleChange}>
        <option value="" className="">Select Position</option>
        <option value="TOP" className="text-gray-400">Top</option>
        <option value="MIDDLE" className="text-green-400">Middle</option>
        <option value="BOTTOM" className="text-red-400">Bottoim</option>
      </select>
    </label>
  );
}

export default Position;
