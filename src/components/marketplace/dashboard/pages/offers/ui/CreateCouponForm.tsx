import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { PromoUpload } from '@/types/Promo';
import { StatusCodes } from 'http-status-codes';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import ProductSelectBox from './ProductSelectBox';
import 'react-toastify/dist/ReactToastify.css';

function makeid(length:number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

function CreateCouponForm() {
  const [formData, setFormData] = useState<Partial<PromoUpload>>({
    offername: 'Onam offer 40',
    type: 'PERCENTAGE',
    method: 'COUPON',
    startTime: '2024-03-29T10:24',
    endTime: '2024-03-30T10:24',
    code: 'Z054O',
    image: '',
    discountPercentage: 60,
    maxUsage: 100,
    discountAmount: 0,
    minAmountInCart: 2000,
    status: 'Active',
    maxUsagePerUser: 3,
    tags: {
      products: ['65d082faac6ecdaa6fa58073'],
    },
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
    if (checked) {
      setFormData((prevState) => ({
        ...prevState,
        tags: { products: [...prevState.tags?.products || [], value] },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        tags: { products: [...prevState.tags?.products.filter((id) => id !== value) || []] },
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
    const Tags:{ products:string[] } = { products: [] };
    formData.tags?.products.forEach((productId) => {
      Tags.products.push(productId);
    });
    form.append('offername', formData.offername!);
    form.append('image', formData.image!);
    form.append('type', formData.type!);
    form.append('method', formData.method!);
    form.append('startTime', formData.startTime!);
    form.append('endTime', formData.endTime!);
    form.append('code', formData.code!);
    form.append('maxUsage', formData.maxUsage?.toString() || '');
    form.append('maxUsagePerUser', formData.maxUsagePerUser?.toString() || '');
    formData.usedBy?.forEach((usedByItem, index) => {
      form.append(`usedBy[${index}].userId`, usedByItem.userId);
      form.append(`usedBy[${index}].count`, usedByItem.count.toString());
    });
    form.append('minAmountInCart', formData.minAmountInCart?.toString() || '');
    form.append('tags', JSON.stringify(Tags));
    form.append('status', formData.status!);
    try {
      const data = await fetch('http://localhost:4000/api/v1/seller/promo', {
        method: 'POST',
        credentials: 'include',
        body: form,
      });
      const response = await data.json();

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

  const genCode = () => {
    setFormData((prevState) => ({
      ...prevState,
      code: makeid(5),
    }));
  };

  return (
    <form className="mt-40 md:mt-44 xl:mt-28 flex p-2 md:p-3 flex-col w-full xl:w-6/12 gap-2 rounded-xl bg-white-200  ">
      <h1 className="text-lg py-1 font-bold text-slate-400 text-center">Create promo codes</h1>
      <label className="py-2 w-full gap-2 flex flex-col text-left ">
        Offer Name:
        <input type="text" name="offername" placeholder="Enter the offer name" onChange={handleChange} className="border-2 py-2 text-slate-700 bg-slate-50 outline-none pl-2 rounded-lg" value={formData.offername} />
      </label>
      <label className="py-2 w-full gap-2 flex flex-col text-left ">
        Coupon Image:
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
          <option value="">Select Type</option>
          <option value="COUPON">COUPON</option>
          <option value="VOUCHER">VOUCHER</option>
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

      <label className="py-2 w-full gap-2 flex  text-left items-center ">
        Coupon Code:
        <input type="text" value={formData.code} name="code" className="border-2 py-2 text-slate-700 w-4/12 bg-slate-50 outline-none pl-2 rounded-lg" min={5} max={10} onChange={handleChange} placeholder="xxxxxxx" />
        <Button className="w-4/12 py-2" variant="secondary" onClick={genCode} type="button">Generate Code</Button>
      </label>

      <label className="py-2 w-full gap-2 flex justify-between items-center">
        Maximum usage limit:
        <input type="number" name="maxUsage" value={formData.maxUsage} min={1} className="border-2 py-2 w-20 text-slate-700 bg-slate-50 outline-none pl-2 rounded-lg" onChange={handleChange} />
      </label>
      <label className="py-2 w-full gap-2 flex justify-between items-center">
        Maximum usage per user limit:
        <input type="number" name="maxUsagePerUser" value={formData.maxUsagePerUser} min={1} className="border-2 py-2 w-20 text-slate-700 bg-slate-50 outline-none pl-2 rounded-lg" onChange={handleChange} />
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

      <label className="py-2 w-full gap-2 flex justify-between items-center">
        Minimum amount in cart:
        <input type="number" name="minAmountInCart" value={formData.minAmountInCart} min={400} className="border-2 py-2 w-20 text-slate-700 bg-slate-50 outline-none pl-2 rounded-lg" onChange={handleChange} />
      </label>

      <div className="py-2 w-full gap-2 flex justify-start items-center">
        Apply to:
        <Button type="button" variant="outline" onClick={() => setTagProducts(!tagProducts)}>Products</Button>
      </div>
      {tagProducts && <ProductSelectBox tagProductId={addProductId} />}

      <label className="py-2 w-full gap-2 flex flex-col text-left ">
        Status:
        <select name="status" className="outline-none p-2 rounded-lg " value={formData.status} onChange={handleChange}>
          <option value="" className="">Select Status</option>
          <option value="Pending" className="text-gray-400">Pending</option>
          <option value="Active" className="text-green-400">Active</option>
          <option value="Expired" className="text-red-400">Expired</option>
        </select>
      </label>

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

export default CreateCouponForm;
