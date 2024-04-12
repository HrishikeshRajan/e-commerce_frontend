/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import {
  Formik, Field, Form,
} from 'formik';
import { ZodError } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { StatusCodes } from 'http-status-codes';
import FormFieldError from '@/utils/FormikError';
import { updateAddress } from '../apis/updateAddress.api';
import AuthHelper from '../../auth/apis/helper';
import { AddressSchema, transformZodToFormikErrors } from './helpers/validationSchema';
import { IAddress } from '..';
import { addUser, removeUser } from '../../../utils/reduxSlice/appSlice';
import { useTypedDispatch } from '../../../hooks/user/reduxHooks';
import Loading from '../../../utils/animations/Loading';

interface IProps {
  address:IAddress
}
function EditAddress() {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();

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
            actions.setSubmitting(false);
            if (response.statusCode === StatusCodes.UNPROCESSABLE_ENTITY) {
              actions.setErrors(transformZodToFormikErrors(new ZodError(response.message?.error)));
            } else if (response?.statusCode === StatusCodes.UNAUTHORIZED
              && response?.success === false) {
              AuthHelper.clearSignedOnData();
              dispatch(removeUser());
              navigate('/auth');
            }
            if (response.success && response.statusCode === StatusCodes.OK) {
              AuthHelper
                .updateUserAddressInLocalStorage(response.message.address, props.address._id);
              const user = AuthHelper.getUserFromLocalStorage();
              dispatch(addUser(user));
            }
          });
        } catch (error) {
          console.error(error);
        }
      }}
    >

      { (form) => (
        <Form className="w-full xl:5/12  bg-white">
          <h2 className="text-2xl text-slate-600 font-bold py-10">Edit Address</h2>
          <div className="flex justify-center flex-col xl:w-8/12">
            <label htmlFor="fullname">Fullname</label>
            <Field
              type="text"
              id="fullname"
              name="fullname"
              className={`block flex-1  border-2 bg-transparent py-2.5 pl-1 rounded-xl text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading${form.errors.fullname && form.touched.fullname && 'border-2 border-red-500'}`}
            />
            <FormFieldError name="fullname" />
            <label htmlFor="homeAddress">Home/Flat Name</label>
            <Field
              type="text"
              name="homeAddress"
              className={`block flex-1 border-2 bg-transparent py-2.5 pl-1 rounded-xl text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading${form.errors.homeAddress && form.touched.homeAddress && 'border-2 border-red-500'}`}
            />
            <FormFieldError name="homeAddress" />
            <div className="flex flex-col  justify-between">
              <div>
                <label htmlFor="city">City</label>
                <Field
                  type="text"
                  name="city"
                  className={`block flex-1 border-2 bg-transparent w-full rounded-xl xl:4/12 py-2.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading${form.errors.city && form.touched.city && 'border-2 border-red-500'}`}
                />
                <FormFieldError name="city" />
              </div>

              <div className="xl:flex xl:flex-row flex-col">
                <div className="w-full">
                  <label htmlFor="state">State</label>

                  <Field
                    type="text"
                    name="state"
                    className={`block flex-1 w-full xl:4/12 border-2 bg-transparent rounded-xl py-2.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading${form.errors.state && form.touched.state && 'border-2 border-red-500'}`}
                  />

                  <FormFieldError name="state" />
                </div>
              </div>
              <div className="flex justify-between w-full flex-col xl:flex-row ">
                <span className="flex flex-col w-full ">
                  <label htmlFor="postalCode">Postal Code</label>
                  <Field
                    type="text"
                    name="postalCode"
                    className={`block w-full xl:4/12 flex-1 border-2 bg-transparent rounded-xl py-2.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading${form.errors.postalCode && form.touched.postalCode && 'border-2 border-red-500'}`}
                  />
                  <FormFieldError name="postalCode" />
                </span>

                <span className="flex flex-col w-full">
                  <label htmlFor="phoneNo">Phone Number</label>
                  <Field
                    type="text"
                    name="phoneNo"
                    className={`block flex-1 border-2 bg-transparent py-2.5 pl-1 rounded-xl text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading${form.errors.phoneNo && form.touched.phoneNo && 'border-2 border-red-500'}`}

                  />
                  <FormFieldError name="phoneNo" />
                </span>
              </div>
            </div>
            <label htmlFor="country">Country</label>
            <Field
              type="text"
              name="country"
              className={`block flex-1 border-2 bg-transparent py-2.5 rounded-xl pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading${form.errors.country && form.touched.country && 'border-2 border-red-500'}`}

            />
            <FormFieldError name="country" />
          </div>
          <div className="w-full flex gap-2 my-2">
            <button type="button" onClick={() => navigate(-1)} className="text-white bg-slate-500 dark:bg-slate-500  font-medium rounded text-sm px-5 py-2.5 ">Back</button>
            {form.isSubmitting
              ? (
                <button type="button" className="text-white bg-slate-500 dark:bg-slate-500  font-medium rounded text-sm px-5 py-2.5 " disabled>
                  <Loading />
                  Saving
                </button>
              )
              : <button type="submit" className="text-white bg-slate-500 dark:bg-slate-500  font-medium rounded text-sm px-5 py-2.5 ">Save</button>}

          </div>
        </Form>
      )}
    </Formik>
  );
}

export default EditAddress;
