/* eslint-disable import/no-cycle */
import React from 'react';
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { StatusCodes } from 'http-status-codes';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useTypedDispatch, useTypedSelector } from 'hooks/user/reduxHooks';
import { useNavigate } from 'react-router-dom';
import { removeUser } from 'utils/reduxSlice/appSlice';
import Loading from '@/utils/animations/Loading';
import AuthHelper from '../../../../auth/apis/helper';
import AddLogo from './AddLogo';
import { updateShop } from '../../pages/shop/apis/updateShop';

export const ShopCoreSchema = z.object({
  name: z.string(),
  description: z.string(),
  address: z.string(),
  email: z.string().email(),
  logo: z.string(),
});

export type Shop = z.infer<typeof ShopCoreSchema>;

function EditForm() {
  const dispatch = useTypedDispatch();
  const shop = useTypedSelector((store) => store.marketplace.shop.currentShop);
  const logo = useTypedSelector((store) => store.marketplace.shop.logo);
  const navigate = useNavigate();
  return (
    <div className="flex  mt-36 lg:mt-20   w-full justify-center p-5 m-2">

      <Formik
        initialValues={{
          name: shop.name || '',
          description: shop.description || '',
          address: shop.address || '',
          email: shop.email || '',
          logo: logo || '',
        }}
        validationSchema={toFormikValidationSchema(ShopCoreSchema)}
        onSubmit={(values, actions) => {
          updateShop({ ...values }, shop._id).then((response) => {
            actions.setSubmitting(false);
            if (response.statusCode === StatusCodes.OK) {
              toast.success('Successfully saved');
            } else if (response?.statusCode === StatusCodes.UNAUTHORIZED
              && response?.success === false) {
              AuthHelper.clearSignedOnData();
              dispatch(removeUser());
              navigate('/auth');
            }
          }).catch((e) => console.log(e));
        }}
      >
        {(form) => (
          <Form className=" shadow-md  sm:w-5/6 p-5" onSubmit={form.handleSubmit}>
            <h1 className="text-4xl text-slate-500 py-2 mb-1">Edit Shop</h1>

            <AddLogo />

            <div className="my-5">
              <label htmlFor="fullname" className="block mb-2 text-sm font-medium text-gray-900 ">Your shop name</label>
              <Field type="text" id="fullname" name="name" aria-describedby="helper-text-explanation" className={`bg-gray-50  text-gray-900 border text-sm rounded-lg block w-full p-2.5    ${form.errors.name && form.touched.name && 'border-2 border-red-500'}`} placeholder="Shop name" />
              <ErrorMessage
                name="name"
                render={(msg) => (
                  <div className="text-red-500 pb-2">
                    {msg}
                  </div>
                )}
              />
            </div>
            <div className="mb-5">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
              <Field type="email" id="email" name="email" aria-describedby="helper-text-explanation" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 ${form.errors.email && form.touched.email && 'border-2 border-red-500'} `} placeholder="name@flowbite.com" />
              <ErrorMessage
                name="email"
                render={(msg) => (
                  <div className="text-red-500 pb-2">
                    {msg}
                  </div>
                )}
              />
            </div>
            <div className="mb-5">

              <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 ">Description about the shop</label>
              <Field as="textarea" id="description" name="description" rows={4} className={`outline-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border ${form.errors.description && form.touched.description && 'border-2 border-red-500'}`} placeholder="write description here" />
              <ErrorMessage
                name="description"
                render={(msg) => (
                  <div className="text-red-500 pb-2">
                    {msg}
                  </div>
                )}
              />
            </div>
            <div className="mb-5">

              <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 ">Enter shop address</label>
              <Field as="textarea" id="address" name="address" rows={4} className={`outline-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 border rounded-lg ${form.errors.address && form.touched.address && 'border-2 border-red-500'}`} placeholder="write address here" />
              <ErrorMessage
                name="address"
                render={(msg) => (
                  <div className="text-red-500 pb-2">
                    {msg}
                  </div>
                )}
              />
            </div>
            <div className="w-full flex justify-between">
              {
                form.isSubmitting
                  ? (
                    <button type="button" className="text-white bg-slate-800 hover:bg-slate-700 outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:bg-opacity-60" disabled>
                      <Loading />
                      Saving
                    </button>
                  )
                  : <button type="submit" className="text-white bg-slate-800 hover:bg-slate-700 outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Save</button>

              }
              <button onClick={() => navigate(-1)} type="button" className="text-white bg-slate-800 hover:bg-slate-700 outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">

                Back
              </button>
            </div>
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

export default EditForm;
