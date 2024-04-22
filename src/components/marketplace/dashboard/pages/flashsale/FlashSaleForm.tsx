/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UploadFlashSale } from '@/types/Sale';
import ProductSelectBox from '../offers/ui/ProductSelectBox';
// import Position from './Position';
import { createFlashsale } from './api/createFlashsale';

function FlashSaleForm() {
  const [formData, setFormData] = useState<Partial<UploadFlashSale>>({
    name: '',
    type: undefined,
    method: 'FLASHSALE',
    startTime: '',
    endTime: '',
    image: '',
    discountPercentage: 0,
    discountAmount: 0,
    status: 'PENDING',
    product: '',
    totalQuantityToSell: 0,
  });

  const [tagProducts, setTagProducts] = useState(false);

  const handleChange = (e:any) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const addProductId = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    if (checked) {
      setFormData((prevState) => ({
        ...prevState,
        product: value,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        product: '',
      }));
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    createFlashsale(formData)
      .then(() => toast.success('Successfully Created'))
      .catch(() => toast.error('Failed to create flash sale'));
  };

  return (
    <form className="mt-40 w-full  md:w-8/12 md:mt-44 xl:left-96 xl:absolute xl:mt-28 flex p-2 md:p-3 flex-col xl:w-6/12 gap-2 rounded-xl bg-white  ">
      <h1 className="text-lg py-1 font-bold text-slate-400 text-center">Create Flash Sale</h1>
      <label className="py-2 w-full gap-2 flex flex-col text-left ">
        Name:
        <input type="text" name="name" value={formData.name} placeholder="Enter the offer name" onChange={handleChange} className="border-2 py-2 text-slate-700 bg-slate-50 outline-none pl-2 rounded-lg" />
      </label>
      {/* <label className="py-2 w-full gap-2 flex flex-col text-left ">
        Banner Image:
        <input type="file" name="image" onChange={handleChange} />
      </label> */}

      <label className="py-2 w-full gap-2 flex flex-col text-left  ">
        Type:
        <select name="type" className="outline-none p-2 rounded-lg " value={formData.type} onChange={handleChange}>
          <option value="">Select Type</option>
          <option value="PERCENTAGE">Percentage</option>
          <option value="FLAT">Flat</option>
          <option value="FREE SHIPPING">Free Shipping</option>
        </select>
      </label>

      <label className="py-2 w-full gap-2 flex flex-col text-left ">
        Method:
        <select name="method" className="outline-none p-2 rounded-lg " value={formData.method} onChange={handleChange}>
          <option value="FLASHSALE">FlashSale</option>
        </select>
      </label>
      <div className="flex flex-col lg:flex-row w-full items-center gap-2 justify-between ">
        <label className="py-2 w-full lg:w-5/12 gap-2 flex flex-col text-left ">
          Start date:
          <input type="datetime-local" value={formData.startTime} className="border-2 w-full py-2 text-slate-700 bg-slate-50 outline-none pl-2 rounded-lg" name="startTime" onChange={handleChange} id="" />
        </label>

        <label className="py-2  gap-2 w-full lg:w-5/12 flex-col text-left ">
          End date:
          <input type="datetime-local" value={formData.endTime} className="border-2 py-2 w-full text-slate-700 bg-slate-50 outline-none pl-2 rounded-lg" name="endTime" onChange={handleChange} id="" />
        </label>
      </div>
      <label className="py-2 w-full gap-2 flex justify-between items-center">
        Total stock to sell:
        <input type="number" name="totalQuantityToSell" value={formData.totalQuantityToSell} min={1} className="border-2 py-2 w-20 text-slate-700 bg-slate-50 outline-none pl-2 rounded-lg" onChange={handleChange} />
      </label>

      {formData.type === 'FLAT' && (
        <label className="py-2 w-full gap-2 flex justify-between items-center">
          Discount Amount:
          <input type="number" name="discountAmount" value={formData.discountAmount} min={1} className="border-2 py-2 w-20 text-slate-700 bg-slate-50 outline-none pl-2 rounded-lg" onChange={handleChange} />
        </label>
      ) }
      {formData.type === 'PERCENTAGE' && (
        <label className="py-2 w-full gap-2 flex justify-between items-center">
          Discount Percentage:
          <input type="number" name="discountPercentage" value={formData.discountPercentage} min={1} className="border-2 py-2 w-20 text-slate-700 bg-slate-50 outline-none pl-2 rounded-lg" onChange={handleChange} />
        </label>
      ) }

      <div className="py-2 w-full gap-2 flex justify-start items-center">
        Apply to:
        <Button type="button" variant="outline" onClick={() => setTagProducts(!tagProducts)}>Products</Button>
      </div>
      {tagProducts && <ProductSelectBox tagProductId={addProductId} />}

      <label className="py-2 w-full gap-2 flex flex-col text-left ">
        Status:
        <select name="status" className="outline-none p-2 rounded-lg " value={formData.status} onChange={handleChange}>
          <option value="" className="">Select Status</option>
          <option value="PENDING" className="text-gray-400">Pending</option>
          <option value="ACTIVE" className="text-green-400">Active</option>
          <option value="EXPIRED" className="text-red-400">Expired</option>
        </select>
      </label>
      {/* <Position formData={formData} handleChange={handleChange} /> */}
      <Button onClick={handleSubmit}>Sumbit</Button>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </form>
  );
}

export default FlashSaleForm;
