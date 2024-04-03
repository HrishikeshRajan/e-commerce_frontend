/* eslint-disable jsx-a11y/label-has-associated-control */
import { Formik, Field, ErrorMessage } from 'formik';
import React from 'react';
import { Form, useNavigate } from 'react-router-dom';
import { ZodError } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { StatusCodes } from 'http-status-codes';
import { ToastContainer, toast } from 'react-toastify';
import AuthHelper from '../../auth/apis/helper';
import { AddressSchema, transformZodToFormikErrors } from './helpers/validationSchema';
import { createAddress } from '../apis/createAddress';
import { useTypedDispatch } from '../../../hooks/user/reduxHooks';
import { addUser, removeUser } from '../../../utils/reduxSlice/appSlice';
import Loading from '../../../utils/animations/Loading';
import 'react-toastify/dist/ReactToastify.css';

function AddAddress() {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{
        fullname: '',
        homeAddress: '',
        city: '',
        state: '',
        postalCode: '',
        phoneNo: '',
        country: '',

      }}
      validationSchema={toFormikValidationSchema(AddressSchema)}
      onSubmit={(values, actions) => {
        createAddress({ ...values }).then((response) => {
          actions.setSubmitting(false);
          if (response.statusCode === StatusCodes.UNPROCESSABLE_ENTITY) {
            actions.setErrors(transformZodToFormikErrors(new ZodError(response.message?.error)));
          } else if (response?.statusCode === StatusCodes.UNAUTHORIZED
              && response?.success === false) {
            AuthHelper.clearSignedOnData();
            dispatch(removeUser());
            navigate('/auth');
          }
          if (response.statusCode === StatusCodes.OK) {
            toast.success('Successfully saved');
            AuthHelper
              .pushAuthenticatedUserAddress((response.message?.user?.address.pop()), () => {
                const user = AuthHelper.getUserFromLocalStorage();
                dispatch(addUser(user));
              });
          }
        });
      }}
    >

      { (form) => (
        <>
          <Form className="w-full md:w-8/12 p-4 h-fit bg-white" onSubmit={form.handleSubmit}>
            <h2 className="text-2xl text-slate-600 font-bold py-10">Enter Your Address</h2>
            <div>
              <label htmlFor="fullname">Fullname</label>
              <Field
                type="text"
                id="fullname"
                name="fullname"
                className={`block flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading${form.errors.fullname && form.touched.fullname && 'border-2 border-red-500'}`}
              />
              <ErrorMessage
                name="fullname"
                render={(msg) => (
                  <div className="text-red-500 pb-2">
                    {msg}
                  </div>
                )}
              />
              <label htmlFor="homeAddress">Home/Flat Name</label>
              <Field
                type="text"
                name="homeAddress"
                className={`block flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading${form.errors.homeAddress && form.touched.homeAddress && 'border-2 border-red-500'}`}
              />
              <ErrorMessage
                name="homeAddress"
                render={(msg) => (
                  <div className="text-red-500 pb-2">
                    {msg}
                  </div>
                )}
              />
              <div className="flex  justify-between">
                <div>
                  <label htmlFor="city">City</label>
                  <Field
                    type="text"
                    name="city"
                    className={`block flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading${form.errors.city && form.touched.city && 'border-2 border-red-500'}`}
                  />
                  <ErrorMessage
                    name="city"
                    render={(msg) => (
                      <div className="text-red-500 pb-2">
                        {msg}
                      </div>
                    )}
                  />
                </div>
                <div>
                  <label htmlFor="state">State</label>
                  <Field
                    type="text"
                    name="state"
                    className={`block flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading${form.errors.state && form.touched.state && 'border-2 border-red-500'}`}
                  />
                  <ErrorMessage
                    name="state"
                    render={(msg) => (
                      <div className="text-red-500 pb-2">
                        {msg}
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <span className="flex flex-col w-1/3 mr-10">
                  <label htmlFor="postalCode">Postal Code</label>
                  <Field
                    type="text"
                    name="postalCode"
                    className={`block flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading${form.errors.postalCode && form.touched.postalCode && 'border-2 border-red-500'}`}
                  />
                  <ErrorMessage
                    name="postalCode"
                    render={(msg) => (
                      <div className="text-red-500 pb-2">
                        {msg}
                      </div>
                    )}
                  />
                </span>

                <span className="flex flex-col w-4/6">
                  <label htmlFor="phoneNo">Phone Number</label>
                  <Field
                    type="text"
                    name="phoneNo"
                    className={`block flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading${form.errors.phoneNo && form.touched.phoneNo && 'border-2 border-red-500'}`}

                  />
                  <ErrorMessage
                    name="phoneNo"
                    render={(msg) => (
                      <div className="text-red-500 pb-2">
                        {msg}
                      </div>
                    )}
                  />
                </span>
              </div>
              <label htmlFor="country">Country</label>
              <Field
                type="text"
                name="country"
                className={`block flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading${form.errors.country && form.touched.country && 'border-2 border-red-500'}`}

              />
              <ErrorMessage
                name="country"
                render={(msg) => (
                  <div className="text-red-500 pb-2">
                    {msg}
                  </div>
                )}
              />
            </div>
            <div className="w-full flex justify-between my-2">
              <button type="button" onClick={() => navigate(-1)} className="text-white bg-slate-500 dark:bg-slate-500  font-medium rounded text-sm px-5 py-2.5 ">Back</button>
              {form.isSubmitting
                ? (
                  <button type="button" className="text-white bg-slate-500 dark:bg-slate-500  font-medium rounded text-sm px-5 py-2.5 " disabled>
                    <Loading />
                    Saving
                  </button>
                )
                : <button type="submit" className="text-white bg-slate-500 dark:bg-slate-500  font-medium rounded text-sm px-5 py-2.5 ">Save Address</button>}

            </div>
          </Form>
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
        </>

      )}
    </Formik>

  );
}

export default AddAddress;
