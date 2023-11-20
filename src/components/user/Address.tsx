/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { IAddress } from '.';

function Address(props:IAddress) {
  return (
    <form method="post" className="w-full lg:w-6/12 p-4 h-fit bg-white ">
      <h2 className="text-2xl text-slate-600 font-bold ">User Address</h2>

      <div className="">
        <h2 className="text-lg font-medium text-slate-600 py-3"> Your Details</h2>
        <label htmlFor="fullname">Fullname</label>
        <input type="text" id="fullname" value={props.fullname} name="fullname" className="inline-block my-1 w-full flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" required />
        <label htmlFor="address">Home/Flat Name</label>
        <input type="text" name="address" value={props.homeAddress} className="inline-block my-1 w-full  flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" required />
        <div className="flex  justify-between">
          <div>
            <label htmlFor="city">City</label>
            <input type="text" name="city" value={props.city} className="inline-block my-1 w-full flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" required />
          </div>
          <div>
            <label htmlFor="city">State</label>
            <input type="text" name="state" value={props.state} className="inline-block my-1 w-full flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 " required />

          </div>
        </div>
        <div className="flex justify-between">
          <span className="flex flex-col w-1/3 mr-10">
            <label htmlFor="pincode">Postal Code</label>
            <input type="text" name="pincode" value={props.postalCode} className="inline-block my-1 w-/12 flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 " required />

          </span>

          <span className="flex flex-col w-4/6">
            <label htmlFor="phonumber">Phone Number</label>
            <input type="text" name="Phonenumber" value={props.phoneNo} className="inline-block my-1 w-full flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 " required />

          </span>
        </div>
        <label htmlFor="country">Country</label>
        <input type="text" name="country" value={props.country} className="inline-block my-1 w-full flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 " required />
      </div>
      <div className="w-full flex justify-between my-2">

        <button type="button" className="text-white bg-slate-500 dark:bg-slate-500  font-medium rounded text-sm px-5 py-2.5 ">Save Address</button>

      </div>
    </form>
  );
}

export default Address;
