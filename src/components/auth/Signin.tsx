/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import {
  Formik, Form, Field,
} from 'formik';
import { ZodError } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import ReCAPTCHA from 'react-google-recaptcha';
import { merge } from 'lodash';
import {
  ErrorResponse,
  FetchApiResponse,
  hasRequestSucceeded,
  isFetchTooManyRequests,
  isFetchUnprocessableEntityError,
} from '@/types/Fetch';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '@/utils/animations/Loading';
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
import { Status } from './types';
import { IUser } from '../user';

function Signin() {
  const dispatch = useTypedDispatch();
  const recaptchaRef = React.createRef<ReCAPTCHA>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [mainError, setMainError] = useState({
    accountError: false,
    message: '',
  });
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        recaptchaToken: '',
      }}
      validationSchema={toFormikValidationSchema(loginSchema)}
      onSubmit={async (values, actions) => {
        setIsSubmitting(true);
        if (import.meta.env.VITE_PROCESS_ENV !== 'test') {
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
        signin({ ...values })
          .then((response:FetchApiResponse<{ userDetails:IUser }> | ErrorResponse) => {
            actions.setStatus('');
            setMainError({ accountError: false, message: '' });
            setIsSubmitting(false);
            if (hasRequestSucceeded(response)) {
              dispatch(addUser(response.message.userDetails));
              dispatch(confirmAuthentication(true));
              AuthHelper.add(response.message.userDetails);
              navigate('/');
            } else if (isFetchUnprocessableEntityError(response)) {
              actions.setErrors(transformZodToFormikErrors(new ZodError(response.error)));
            } else if (isFetchTooManyRequests(response)) {
              const errorObj:Status = { success: false, message: response.error };
              actions.setStatus(errorObj);
            } else {
              setMainError({ accountError: true, message: response.error });
            }
          }).catch((e) => {
            setIsSubmitting(false);
            setMainError({ accountError: true, message: (e as Error).message });
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
          {import.meta.env.VITE_PROCESS_ENV !== 'test'
          && (
            <ReCAPTCHA
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              ref={recaptchaRef}
              size="invisible"
            />
          )}
          {
            isSubmitting ? (
              <Button
                type="button"
                className="mt-10 mb-5 cursor-wait rounded-lg bg-slate-600 p-3 text-xl font-bold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                mode="loading"
                disabled
                loadingAnimation
              >
                <Loading />
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
          <div className="flex justify-between items-center mb-3">
            <Link to="/" className=" text-sm font-bold text-slate-800">Go to Home?</Link>
            <ForgotPassword />
          </div>

          <ReCaptchaInfo />
        </Form>
      )}
    </Formik>
  );
}

export default Signin;
