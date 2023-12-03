/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { ZodError } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { StatusCodes } from 'http-status-codes';
import { signin } from './apis/signin.api';
import AuthHelper from './apis/helper';
import { useTypedDispatch } from '../../hooks/user/reduxHooks';
import { addUser, confirmAuthentication } from '../../utils/reduxSlice/appSlice';
import { transformZodToFormikErrors } from '../user/address/helpers/validationSchema';
import { loginSchema } from './helpers/validationSchema.helper';
import ForgotPassword from './ForgotPassword';
import Loading from '../../utils/animations/Loading';

function Signin():React.JSX.Element {
  const dispatch = useTypedDispatch();

  const [mainError, setMainError] = useState({
    accountError: false,
    message: '',
  });
  const [redirects, setRedirect] = useState(false);

  if (redirects) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',

        }}
        validationSchema={toFormikValidationSchema(loginSchema)}
        onSubmit={(values, actions) => {
          signin({ ...values }).then((response: any) => {
            actions.setSubmitting(false);
            if (!response.success && response.statusCode === StatusCodes.UNPROCESSABLE_ENTITY) {
              actions.setErrors(transformZodToFormikErrors(new ZodError(response.message?.error)));
            }
            if (
              !response.success
            && response.message.error
            && (
              (response.statusCode === StatusCodes.BAD_REQUEST)
               || (response.statusCode === StatusCodes.INTERNAL_SERVER_ERROR)
            )
            ) {
              setMainError({ accountError: true, message: response.message?.error });
              return;
            }
            if (response.success) {
              dispatch(addUser(response.message?.user));
              dispatch(confirmAuthentication(true));
              AuthHelper.authenticate(response.message.user, () => {
                setRedirect(true);
              });
            }
          });
        }}

      >
        {(form) => (
          <Form
            className="w-10/12 lg:w-4/12 border-2 border-gray-300 rounded flex flex-col p-2 lg:p-5"
          >
            <h2 className="text-xl font-semibold leading-7 text-gray-900 text-center mt-2">
              Sign In
            </h2>
            {mainError.accountError && (
              <h4
                data-testid="e"
                className="text-red-500 p-3 font-bold bg-red-50 my-2 rounded"
              >
                {mainError.message}
              </h4>
            )}
            <label htmlFor="email">Email</label>
            <Field
              type="email"
              name="email"
              id="email"
              aria-label="email"
              className="block flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
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
              className="block flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            />
            <ErrorMessage
              name="password"
              render={(msg) => (
                <div className="text-red-500 pb-2">
                  {msg}
                </div>
              )}
            />
            {
              form.isSubmitting ? (
                <button
                  type="button"
                  className="mt-4 mb-5 rounded bg-slate-600 px-3 py-2 text-sm font-semibold bg-opacity-70 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  disabled
                >
                  <Loading />
                  Please wait
                </button>
              ) : (
                <button
                  type="submit"
                  className="mt-4 mb-5 rounded bg-slate-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Signin
                </button>
              )
            }
          </Form>
        )}
      </Formik>
      <div className="flex justify-end">
        <ForgotPassword />
      </div>
    </>
  );
}

export default Signin;
