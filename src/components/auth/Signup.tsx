/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { StatusCodes } from 'http-status-codes';
import { signup } from './apis/signup.api';
import { registerSchema } from './helpers/validationSchema.helper';
import Loading from '../../utils/animations/Loading';

function Signup() {
  return (
    <Formik
      initialValues={
        {
          fullname: '',
          email: '',
          password: '',
        }
      }
      validationSchema={toFormikValidationSchema(registerSchema)}
      onSubmit={(values, actions) => {
        signup({ ...values }).then((response: any) => {
          actions.setSubmitting(false);
          if (response.success && response.statusCode === StatusCodes.OK) {
            actions.setStatus(response.message?.message);
          } else {
            actions.setStatus(response.message?.error);
          }
        });
      }}
    >
      {(form) => (
        <Form
          className="w-10/12 lg:w-4/12 border-2 border-gray-300 rounded flex flex-col p-2 lg:p-5"
        >
          <h2 className="text-xl font-semibold leading-7 text-gray-900 text-center mt-2">
            Sign Up
          </h2>
          {form.status && (
            <h4 className="text-green-500 p-3 font-bold bg-green-50 my-2 rounded">
              {form.status}
            </h4>
          )}
          <label htmlFor="fullname">Fullname</label>
          <Field
            type="text"
            name="fullname"
            id="fullname"
            aria-label="fullname"
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
          <label htmlFor="email">Email</label>
          <Field
            type="email"
            name="email"
            id="email"
            aria-label="email"
            className={`block flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading${form.errors.email && form.touched.email && 'border-2 border-red-500'}`}

          />
          <ErrorMessage
            name="email"
            render={(msg) => (
              <div className="text-red-500 pb-2">
                {msg}
              </div>
            )}
          />

          <label htmlFor="password">Password</label>
          <Field
            type="password"
            name="password"
            id="password"
            aria-label="password"
            className={`block flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading${form.errors.password && form.touched.password && 'border-2 border-red-500'}`}

          />
          <ErrorMessage
            name="password"
            render={(msg) => (
              <div className="text-red-500 pb-2">
                {msg}
              </div>
            )}
          />
          {form.isSubmitting ? (
            <button
              type="button"
              className="mt-4 mb-5 rounded bg-slate-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <Loading />
              Please wait
            </button>
          ) : (
            <button
              type="submit"
              className="mt-4 mb-5 rounded bg-slate-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign Up
            </button>
          )}
        </Form>
      )}
    </Formik>
  );
}

export default Signup;
