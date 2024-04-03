import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { StatusCodes } from 'http-status-codes';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UploadFlashSale } from '@/types/Sale';
import ProductSelectBox from '../offers/ui/ProductSelectBox';
import Position from './Position';

function FlashSaleForm() {
  const [formData, setFormData] = useState<Partial<UploadFlashSale>>({
    name: 'Onam offer 40',
    type: 'PERCENTAGE',
    method: 'FLASHSALE',
    startTime: '',
    endTime: '',
    image: '',
    discountPercentage: 60,
    discountAmount: 0,
    status: 'ACTIVE',
    product: '',
    totalQuantityToSell: 0,
    position: undefined,
  });

  const [tagProducts, setTagProducts] = useState(false);

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (e.target.files) {
      setFormData({ ...formData, [name]: e.target.files[0] });
    }
  };

  const addProductId = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    console.log(checked, value);
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

  const notify = (message:string) => toast.success(message, {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Bounce,
  });
  const notifyError = (message:string) => toast.error(message, {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Bounce,
  });
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const form = new FormData();

    form.append('name', formData.name!);
    form.append('image', formData.image!);
    form.append('type', formData.type!);
    form.append('method', formData.method!);
    form.append('startTime', formData.startTime!);
    form.append('endTime', formData.endTime!);
    form.append('totalQuantityToSell', String(formData.totalQuantityToSell!));

    if (formData.type === 'PERCENTAGE') {
      form.append('discountPercentage', String(formData.discountPercentage!));
    }
    if (formData.type === 'FLAT') {
      form.append('discountAmount', String(formData.discountAmount!));
    }

    form.append('product', formData.product!);
    form.append('status', formData.status!);
    form.append('position', formData.position!);
    try {
      const data = await fetch('http://localhost:4000/api/v1/seller/flashsale', {
        method: 'POST',
        credentials: 'include',
        body: form,
      });
      const response = await data.json();
      console.log(response);
      if (response.statusCode === StatusCodes.CREATED) {
        notify('Coupon Created');
      }
      if (response.statusCode === StatusCodes.CONFLICT) {
        notifyError(response.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="mt-40 md:mt-44 xl:mt-28 flex p-2 md:p-3 flex-col w-full xl:w-6/12 gap-2 rounded-xl bg-white-200  ">
      <h1 className="text-lg py-1 font-bold text-slate-400 text-center">Create Flash Sale</h1>
      <label className="py-2 w-full gap-2 flex flex-col text-left ">
        Name:
        <input type="text" name="offername" placeholder="Enter the offer name" onChange={handleChange} className="border-2 py-2 text-slate-700 bg-slate-50 outline-none pl-2 rounded-lg" value={formData.name} />
      </label>
      <label className="py-2 w-full gap-2 flex flex-col text-left ">
        Banner Image:
        <input type="file" name="image" onChange={handleChange} />
      </label>

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
          <input type="datetime-local" className="border-2 w-full py-2 text-slate-700 bg-slate-50 outline-none pl-2 rounded-lg" name="startTime" onChange={handleChange} id="" />
        </label>

        <label className="py-2  gap-2 w-full lg:w-5/12 flex-col text-left ">
          End date:
          <input type="datetime-local" className="border-2 py-2 w-full text-slate-700 bg-slate-50 outline-none pl-2 rounded-lg" name="endTime" onChange={handleChange} id="" />
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
      <Position formData={formData} handleChange={handleChange} />
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
