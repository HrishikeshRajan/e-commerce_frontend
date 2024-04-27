/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import {
  Field, Form, Formik,
} from 'formik';
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
import { ZodError } from 'zod';
import { signup } from './apis/signup.api';
import { registerSchema } from './helpers/validationSchema.helper';
import Label from './Label';
import Button from './ui/Button';
import FormFieldError from './ui/FormFieldError';
import { Status } from './types';
import ReCaptchaInfo from './ReCaptchaInfo';
import { transformZodToFormikErrors } from '../user/address/helpers/validationSchema';
/**
 * @description
 * Signup component allows users to register new account.
 */

function Signup({ toggleAuthState }:{ toggleAuthState:() => void }): React.JSX.Element {
  const [success, setSuccess] = useState(false);
  const recaptchaRef = React.createRef<ReCAPTCHA>();
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
      onSubmit={async (values, actions) => {
        actions.setSubmitting(true);
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
        actions.setStatus(null);

        signup({ ...values })
          .then((response: FetchApiResponse<{ message:string }> | ErrorResponse) => {
            actions.setSubmitting(true);
            if (hasRequestSucceeded(response)) {
              const resObj:Status = { success: true, message: response.message.message };
              actions.setStatus(resObj);
              setSuccess(true);
            } else if (isFetchUnprocessableEntityError(response)) {
              actions.setErrors(transformZodToFormikErrors(new ZodError(response.error)));
            } else if (isFetchTooManyRequests(response)) {
              const errorObj:Status = { success: false, message: response.error };
              actions.setStatus(errorObj);
            } else {
              const errorObj:Status = { success: false, message: response.error };
              actions.setStatus(errorObj);
            }
          }).catch((e) => {
            actions.setSubmitting(true);
            const errorObj:Status = { success: false, message: (e as Error).message };
            actions.setStatus(errorObj);
          });
      }}
    >
      {(form) => (
        <Form
          className="w-full bg-white xl:shadow-md  rounded-xl  xl:w-4/12  flex flex-col px-2 lg:p-5"
        >

          <h2 className="text-3xl font-semibold leading-7 text-cyan-500 text-center mt-5 mb-2">
            Sign up
          </h2>
          {form.status && (
            <h4 data-testid="h4" className={`${form.status.success ? 'text-green-500  bg-green-50' : 'text-red-500 bg-red-50'} p-3 font-bold  mt-2 rounded`}>
              {form.status.message}
            </h4>
          )}
          <Label id="fullname" value="Fullname" />
          <Field
            type="text"
            name="fullname"
            id="fullname"
            aria-label="fullname"
            className={`block flex-1 rounded-lg border-2  bg-transparent p-4 xl:p-3  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading${form.errors.fullname && form.touched.fullname && 'border-2 border-red-500'}`}
          />
          <FormFieldError name="fullname" />
          <Label id="email" value="Email" />
          <Field
            type="email"
            name="email"
            id="email"
            aria-label="email"
            className={`block flex-1 rounded-lg border-2 bg-transparent p-4 xl:p-3  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading${form.errors.email && form.touched.email && 'border-2 border-red-500'}`}

          />
          <FormFieldError name="email" />
          <Label id="password" value="Password" />
          <Field
            type="password"
            name="password"
            id="password"
            aria-label="password"
            className={`block rounded-lg flex-1 border-2 bg-transparent p-4 xl:p-3  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading${form.errors.password && form.touched.password && 'border-2 border-red-500'}`}

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

          {form.isSubmitting ? (

            <Button
              type="button"
              className="mt-10 mb-5 cursor-wait rounded-lg bg-slate-600 p-3 text-xl font-bold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              mode="loading"
              disabled
              loadingAnimation
            >
              Signing
            </Button>
          ) : (

            !success ? (
              <Button
                type="submit"
                className="mt-5 mb-5 rounded-lg bg-slate-600 p-3 text-xl font-bold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                mode="idle"
                disabled={false}
              >
                Continue
              </Button>
            ) : (
              <Button
                type="button"
                className="mt-10 mb-5 rounded-lg bg-slate-600 p-3 text-xl font-bold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                mode="idle"
                onClick={toggleAuthState}
                disabled={false}
              >
                Back to login
              </Button>
            )
          )}
          <ReCaptchaInfo />
        </Form>
      )}
    </Formik>
  );
}

export default Signup;
