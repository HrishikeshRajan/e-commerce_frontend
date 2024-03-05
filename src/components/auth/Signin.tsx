/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
  Formik, Form, Field,
} from 'formik';
import { ZodError } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { StatusCodes } from 'http-status-codes';
import ReCAPTCHA from 'react-google-recaptcha';
import { merge } from 'lodash';
import { signin } from './apis/signin.api';

import { useTypedDispatch } from '../../hooks/user/reduxHooks';
import { addUser, confirmAuthentication } from '../../utils/reduxSlice/appSlice';
import { transformZodToFormikErrors } from '../user/address/helpers/validationSchema';
import { loginSchema } from './helpers/validationSchema.helper';
import ForgotPassword from './ForgotPassword';
import Label from './Label';
import Button from './ui/Button';
import FormFieldError from './ui/FormFieldError';
import AuthHelper from './apis/helper';
import ReCaptchaInfo from './ReCaptchaInfo';
import { Status } from '.';

function Signin():React.JSX.Element {
  const dispatch = useTypedDispatch();
  const recaptchaRef = React.createRef<ReCAPTCHA>();
  const [mainError, setMainError] = useState({
    accountError: false,
    message: '',
  });
  const [redirects, setRedirect] = useState(false);

  if (redirects) {
    return <Navigate to="/" />;
  }

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        recaptchaToken: '',
      }}
      validationSchema={toFormikValidationSchema(loginSchema)}
      onSubmit={async (values, actions) => {
        if (import.meta.env.VITE_PROCESS_ENV === 'production') {
          const recaptchaToken = await recaptchaRef.current?.executeAsync();
          recaptchaRef.current?.reset();

          if (!recaptchaToken) {
            const errorObj:Status = { success: false, message: 'Please verify reCaptcha' };
            actions.setStatus(errorObj);
            actions.setSubmitting(false);
            return;
          }
          merge(values, { recaptchaToken });
        }
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
          if (response.success && response.statusCode === StatusCodes.OK) {
            dispatch(addUser(response.message?.userDetails));
            dispatch(confirmAuthentication(true));
            AuthHelper.authenticate(true);
            setRedirect(true);
          }
        });
      }}
    >
      {(form) => (
        <Form
          className="w-full bg-white xl:shadow-md  rounded-xl  xl:w-4/12  flex flex-col px-2 lg:p-5"
        >
          <h2 className="text-xl font-semibold leading-7 text-cyan-500 text-center mt-5 mb-2">
            WonderCart
          </h2>
          {mainError.accountError && (
            <h4
              data-testid="e"
              className="text-red-500 p-3 font-bold bg-red-50 my-2 rounded"
            >
              {mainError.message}
            </h4>
          )}
          <Label id="email" value="Email" />
          <Field
            type="email"
            name="email"
            id="email"
            aria-label="email"
            className={`block rounded-lg flex-1 border-2 bg-transparent  p-4 xl:p-3  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading${form.errors.email && form.touched.email && 'border-2 border-red-500'}`}
          />
          <FormFieldError name="email" />
          <Label id="password" value="Password" />
          <Field
            type="password"
            name="password"
            id="password"
            data-testid="password"
            aria-label="password"
            className={`block flex-1 rounded-lg border-2 bg-transparent  p-4 xl:p-3  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading${form.errors.password && form.touched.password && 'border-2 border-red-500'}`}
          />
          <FormFieldError name="password" />
          {import.meta.env.VITE_PROCESS_ENV === 'production'
          && (
            <ReCAPTCHA
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              ref={recaptchaRef}
              size="invisible"
            />
          )}
          {
            form.isSubmitting ? (
              <Button
                type="button"
                className="mt-10 mb-5 cursor-wait rounded-lg bg-slate-600 p-3 text-xl font-bold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                mode="loading"
                disabled
                loadingAnimation={false}
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
                Sign in
              </Button>
            )
          }
          <div className="flex justify-end mb-3">
            <ForgotPassword />
          </div>

          <ReCaptchaInfo />
        </Form>
      )}
    </Formik>
  );
}

export default Signin;
