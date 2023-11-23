/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import { ZodError, z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { updateAddress } from '../apis/updateAddress.api';
import AuthHelper from '../../auth/apis/helper';
import { AddressSchema, transformZodToFormikErrors } from './helpers/helper';
import { IAddress } from '..';

interface IProps {
  address:IAddress
}
function EditAddress() {
  const navigate = useNavigate();
  const loadAddress = useLoaderData() as IAddress;
  if (!loadAddress) return;
  const props:IProps = {
    address: loadAddress,
  };

  return (
    <Formik
      initialValues={{
        fullname: props.address.fullname,
        homeAddress: props.address.homeAddress,
        city: props.address.city,
        state: props.address.state,
        postalCode: props.address.postalCode,
        phoneNo: props.address.phoneNo,
        country: props.address.country,

      }}
      validationSchema={toFormikValidationSchema(AddressSchema)}
      onSubmit={(values, actions) => {
        try {
          updateAddress({ ...values }, props.address._id).then((response) => {
            if (response.statusCode === 422) {
              actions.setErrors(transformZodToFormikErrors(new ZodError(response.message?.error)));
            }
            actions.setSubmitting(false);
            AuthHelper.updateAuthenticatedUserAddress(response.message?.address, props.address._id);
          });
        } catch (error) {
          console.error(error);
        }
      }}
    >

      { (formik) => (
        <Form className="w-full lg:w-full p-4 h-fit bg-white">
          <h2 className="text-2xl text-slate-600 font-bold py-10">Edit Address</h2>
          <div>
            <label htmlFor="fullname">Fullname</label>
            <Field
              type="text"
              name="fullname"
              className={`inline-block my-1 w-full flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ${(formik.touched.fullname
            && formik.errors.fullname) ? 'border-2 border-red-500' : ''}`}
            />
            {formik.touched.fullname
            && formik.errors.fullname
            && <div className="text-red-500 pb-2">{formik.errors.fullname}</div>}

            <label htmlFor="homeAddress">Home/Flat Name</label>
            <Field
              type="text"
              name="homeAddress"
              className={`inline-block my-1 w-full flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ${(formik.touched.homeAddress
            && formik.errors.homeAddress) ? 'border-2 border-red-500' : ''}`}
            />
            {formik.touched.homeAddress
            && formik.errors.homeAddress
            && <div className="text-red-500 pb-2">{formik.errors.homeAddress}</div>}

            <div className="flex  justify-between">
              <div>
                <label htmlFor="city">City</label>
                <Field
                  type="text"
                  name="city"
                  className={`inline-block my-1 w-full flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ${(formik.touched.city
            && formik.errors.city) ? 'border-2 border-red-500' : ''}`}
                />
                {formik.touched.city
            && formik.errors.city
            && <div className="text-red-500 pb-2">{formik.errors.city}</div>}
              </div>
              <div>
                <label htmlFor="city">State</label>
                <Field
                  type="text"
                  name="state"
                  className={`inline-block my-1 w-full flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ${(formik.touched.state
            && formik.errors.state) ? 'border-2 border-red-500' : ''}`}
                />
                {formik.touched.state
            && formik.errors.state
            && <div className="text-red-500 pb-2">{formik.errors.state}</div>}
              </div>
            </div>
            <div className="flex justify-between">
              <span className="flex flex-col w-1/3 mr-10">
                <label htmlFor="postalCode">Postal Code</label>
                <Field
                  type="text"
                  name="postalCode"
                  className={`inline-block my-1 w-full flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ${(formik.touched.postalCode
            && formik.errors.postalCode) ? 'border-2 border-red-500' : ''}`}
                />
                {formik.touched.postalCode
            && formik.errors.postalCode
            && <div className="text-red-500 pb-2">{formik.errors.postalCode}</div>}
              </span>

              <span className="flex flex-col w-4/6">
                <label htmlFor="phoneNo">Phone Number</label>
                <Field
                  type="text"
                  name="phoneNo"
                  className={`inline-block my-1 w-full flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ${(formik.touched.phoneNo
            && formik.errors.phoneNo) ? 'border-2 border-red-500' : ''}`}
                />
                {formik.touched.phoneNo
            && formik.errors.phoneNo
            && <div className="text-red-500 pb-2">{formik.errors.phoneNo}</div>}
              </span>
            </div>
            <label htmlFor="country">Country</label>
            <Field
              type="text"
              name="country"
              className={`inline-block my-1 w-full flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ${(formik.touched.country
            && formik.errors.country) ? 'border-2 border-red-500' : ''}`}

            />
            {formik.touched.country
            && formik.errors.country
            && <div className="text-red-500 pb-2">{formik.errors.country}</div>}
          </div>
          <div className="w-full flex justify-between my-2">
            <button type="button" onClick={() => navigate(-1)} className="text-white bg-slate-500 dark:bg-slate-500  font-medium rounded text-sm px-5 py-2.5 ">Back</button>
            {formik.isSubmitting
              ? <button type="button" className="text-white bg-slate-500 dark:bg-slate-500  font-medium rounded text-sm px-5 py-2.5 " disabled>updating</button>
              : <button type="submit" className="text-white bg-slate-500 dark:bg-slate-500  font-medium rounded text-sm px-5 py-2.5 ">Save Address</button>}

          </div>
        </Form>
      )}
    </Formik>
  );
}

export default EditAddress;
