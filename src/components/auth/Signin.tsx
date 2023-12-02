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
import { transformZodToFormikErrors } from '../user/address/helpers/helper';
import { loginSchema } from './helpers/validationSchema.helper';
import ForgotPassword from './ForgotPassword';

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
                  <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                  </svg>
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
