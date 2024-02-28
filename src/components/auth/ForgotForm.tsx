/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Formik, Form, Field,
} from 'formik';
import React from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { StatusCodes } from 'http-status-codes';
import { ZodError } from 'zod';
import { useNavigate } from 'react-router-dom';
import { emailSchema } from './helpers/validationSchema.helper';
import { forgot } from './apis/forgot.api';
import { transformZodToFormikErrors } from '../user/address/helpers/validationSchema';
import useAuthPage from '../../hooks/user/useAuthPage';
import Button from './ui/Button';
import FormFieldError from './ui/FormFieldError';

function ForgotForm() {
  const navigate = useNavigate();

  useAuthPage();

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Formik
        initialValues={{
          email: '',

        }}
        validationSchema={toFormikValidationSchema(emailSchema)}
        onSubmit={(values, actions) => {
          actions.setStatus('');
          forgot(values.email).then((response) => {
            actions.setSubmitting(false);
            if (!response.success && response.statusCode === StatusCodes.UNPROCESSABLE_ENTITY) {
              actions.setErrors(transformZodToFormikErrors(new ZodError(response.message?.error)));
            }
            if (response.success) {
              actions.setStatus(response.message?.message);
            }
          });
        }}
      >
        {(form) => (
          <Form
            className="w-11/12 lg:w-4/12   justify-center border-gray-300 rounded-xl bg-white mt-20  flex flex-col p-2 lg:p-5"
          >
            <h1 className="text-xl my-2 font-semibold leading-7 text-cyan-400 text-center mt-2">
              WonderCart
            </h1>
            <h2 className="text-xl my-2 font-semibold leading-7 text-gray-500 text-left mt-2">
              Forgot Password
            </h2>
            {form.status && <h4 className="p-5 bg-green-100">{form.status}</h4>}

            <label htmlFor="email" className="py-2 text-slate-700 text-left ml-1">Enter your registered email address</label>
            <Field
              type="email"
              name="email"
              id="email"
              aria-label="email"
              className={`block flex-1 border-2 bg-transparent p-4 xl:p-3 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading${form.errors.email && form.touched.email && 'border-2 border-red-500'}`}

            />

            <FormFieldError name="email" />

            {
              form.isSubmitting ? (
                <Button
                  type="button"
                  className="mt-10 mb-5 cursor-wait rounded-lg bg-slate-600 p-3 text-xl font-bold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  mode="loading"
                  disabled
                  loadingAnimation
                >
                  Please wait
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="mt-5 mb-5 rounded-lg bg-slate-600 p-3 text-xl font-bold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  mode="idle"
                  disabled={false}
                >
                  Continue
                </Button>
              )
            }
            <Button
              type="button"
              className="mt-1 mb-5 text-right rounded-lg  p-3 text-base xl:text-xs font-bold text-slate-800 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              mode="idle"
              disabled={false}
              onClick={() => navigate('/auth')}
            >
              Back to Login ?
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ForgotForm;
