/* eslint-disable import/no-cycle */
import React from 'react';
import {
  Field, Form, Formik,
} from 'formik';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useTypedSelector } from 'hooks/user/reduxHooks';
import Loading from '@/utils/animations/Loading';
import { merge } from 'lodash';
import FormFieldError from '@/utils/FormikError';
import { FetchApiResponse, ErrorResponse, hasRequestSucceeded } from '@/types/Fetch';
import { createNewShop } from '../../pages/shop/apis/createShop';
import AddLogo from './AddLogo';

export const ShopCoreSchema = z.object({
  name: z.string(),
  description: z.string(),
  address: z.string(),
  email: z.string().email(),
  logo: z.string().optional(),
});

export type Shop = z.infer<typeof ShopCoreSchema>;

function AddForm() {
  const logo = useTypedSelector((store) => store.marketplace.shop.logo);

  return (
    <div className="flex  w-full justify-center p-5 z-10 rounded-xl">

      <Formik
        initialValues={{
          name: '',
          description: '',
          address: '',
          email: '',
          logo: '',
        }}
        validationSchema={toFormikValidationSchema(ShopCoreSchema)}
        onSubmit={(values, actions) => {
          merge(values, { logo });
          createNewShop({ ...values })
            .then((response:FetchApiResponse<{ message:string }> | ErrorResponse) => {
              actions.setSubmitting(false);
              if (hasRequestSucceeded(response)) {
                actions.resetForm();
                toast.success('Successfully saved');
              } else {
                toast.error('Shop creation failed');
              }
            });
        }}
      >
        {(form) => (
          <Form className=" shadow-md  bg-white  w-full xl:w-4/12  top-full mt-10 xl:mt-20 p-5">
            <h1 className="text-xl text-slate-500 py-2 mb-1">
              Create Shop
            </h1>

            <AddLogo form={form} />

            <div className="my-5">
              <label htmlFor="fullname" className="block mb-2 text-sm font-medium text-gray-900 ">Your shop name</label>
              <Field type="text" id="fullname" name="name" aria-describedby="helper-text-explanation" className={`bg-gray-50  text-gray-900 border text-sm rounded-lg block w-full p-2.5    ${form.errors.name && form.touched.name && 'border-2 border-red-500'}`} placeholder="Shop name" />

              <FormFieldError name="name" />
            </div>
            <div className="mb-5">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
              <Field type="email" id="email" name="email" aria-describedby="helper-text-explanation" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 ${form.errors.email && form.touched.email && 'border-2 border-red-500'} `} placeholder="shop email" />
              <FormFieldError name="email" />
            </div>
            <div className="mb-5">

              <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 ">Description about the shop</label>
              <Field as="textarea" id="description" name="description" rows={4} className={`outline-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border ${form.errors.description && form.touched.description && 'border-2 border-red-500'}`} placeholder="write description here" />
              <FormFieldError name="description" />
            </div>
            <div className="mb-5">

              <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 ">Enter shop address</label>
              <Field as="textarea" id="address" name="address" rows={4} className={`outline-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 border rounded-lg ${form.errors.address && form.touched.address && 'border-2 border-red-500'}`} placeholder="write address here" />
              <FormFieldError name="address" />
            </div>
            {
              form.isSubmitting
                ? (
                  <button type="button" className="text-white bg-slate-800 hover:bg-slate-700 outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:bg-opacity-60" disabled>
                    <Loading />
                    Please wait
                  </button>
                )

                : <button type="submit" className="text-white bg-slate-800 hover:bg-slate-700 outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Create</button>

            }
          </Form>
        )}

      </Formik>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default AddForm;
