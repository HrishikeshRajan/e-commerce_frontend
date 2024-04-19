/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Formik, Form, Field,
} from 'formik';
import React, { useState } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { ZodError } from 'zod';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { merge } from 'lodash';
import {
  ErrorResponse,
  FetchApiResponse,
  hasRequestSucceeded,
  isFetchTooManyRequests,
  isFetchUnprocessableEntityError,
} from '@/types/Fetch';
import { emailSchema } from './helpers/validationSchema.helper';
import { forgot } from './apis/forgot.api';
import { transformZodToFormikErrors } from '../user/address/helpers/validationSchema';
import useAuthPage from '../../hooks/user/useAuthPage';
import Button from './ui/Button';
import FormFieldError from './ui/FormFieldError';
import { Status } from './types';
import ReCaptchaInfo from './ReCaptchaInfo';

function ForgotForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const recaptchaRef = React.createRef<ReCAPTCHA>();
  useAuthPage();

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Formik
        initialValues={{
          email: '',
          recaptchaToken: '',

        }}
        validationSchema={toFormikValidationSchema(emailSchema)}
        onSubmit={async (values, actions) => {
          actions.setStatus('');
          setIsSubmitting(true);
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
          forgot(values).then((response: FetchApiResponse<{ message:string }> | ErrorResponse) => {
            setIsSubmitting(false);
            if (hasRequestSucceeded(response)) {
              const resObj:Status = { success: true, message: response.message.message };
              actions.setStatus(resObj);
            } else if (isFetchUnprocessableEntityError(response)) {
              actions.setErrors(transformZodToFormikErrors(new ZodError(response.error)));
            } else if (isFetchTooManyRequests(response)) {
              const errorObj:Status = { success: false, message: response.error };
              actions.setStatus(errorObj);
            } else {
              const errorObj:Status = { success: false, message: response.error };
              actions.setStatus(errorObj);
            }
          }).catch((error) => {
            setIsSubmitting(false);
            const errorObj:Status = { success: false, message: (error as Error).message };
            actions.setStatus(errorObj);
          });
        }}
      >
        {(form) => (
          <Form
            className="w-11/12 xl:w-4/12   justify-center border-gray-300 rounded-xl bg-white mt-20  flex flex-col p-2 lg:p-5"
          >
            <h1 className="text-xl my-2 font-semibold leading-7 text-cyan-400 text-center mt-2">
              WonderCart
            </h1>
            <h2 className="text-xl my-2 font-semibold leading-7 text-gray-500 text-left mt-2">
              Forgot Password
            </h2>
            {form.status && (
              <h4 data-testid="h4" className={`${form.status.success ? 'text-green-500  bg-green-50' : 'text-red-500 bg-red-50'} p-3 font-bold  mt-2 rounded`}>
                {form.status.message}
              </h4>
            )}

            <label htmlFor="email" className="py-2 text-slate-700 text-left ml-1">Enter your registered email address</label>
            <Field
              type="email"
              name="email"
              id="email"
              aria-label="email"
              className={`block flex-1 border-2 bg-transparent p-4 xl:p-3 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading${form.errors.email && form.touched.email && 'border-2 border-red-500'}`}

            />

            <FormFieldError name="email" />

            {import.meta.env.VITE_PROCESS_ENV === 'production'
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
            <ReCaptchaInfo />
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ForgotForm;
