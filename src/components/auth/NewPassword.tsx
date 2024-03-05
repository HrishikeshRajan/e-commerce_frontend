/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-extraneous-dependencies */
import { Formik, Field } from 'formik';
import { StatusCodes } from 'http-status-codes';
import React from 'react';
import {
  Form, useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { ZodError } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import ReCAPTCHA from 'react-google-recaptcha';
import { merge } from 'lodash';
import { transformZodToFormikErrors } from '../user/address/helpers/validationSchema';
import { updatePassword } from './apis/updatePassword.api';
import { passwordSchema } from './helpers/validationSchema.helper';
import Button from './ui/Button';
import FormFieldError from './ui/FormFieldError';
import { Status } from '.';
import ReCaptchaInfo from './ReCaptchaInfo';

function NewPassword() {
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const recaptchaRef = React.createRef<ReCAPTCHA>();
  // if (!search.get('token')) {
  //   return navigate('/auth');
  // }
  return (
    <div className="h-screen w-full flex justify-center items-center  bg-white">
      <Formik
        initialValues={{
          password: '',
          token: search.get('token')!,
          recaptchaToken: '',
        }}
        validationSchema={toFormikValidationSchema(passwordSchema)}
        onSubmit={async (values, actions) => {
          actions.setStatus('');
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
          updatePassword({ ...values }).then((response) => {
            actions.setSubmitting(false);
            if (!response.success && response.statusCode === StatusCodes.UNPROCESSABLE_ENTITY) {
              actions.setErrors(transformZodToFormikErrors(new ZodError(response.message?.error)));
            }
            if (response.success) {
              actions.setStatus(response.message?.message);
            }
            if (!response.success && response.statusCode === StatusCodes.UNAUTHORIZED) {
              navigate('/expired');
            }
          });
        }}
      >
        {(form) => (
          <Form
            className=" xl:border-2 justify-center rounded-xl flex flex-col p-2 lg:p-5"
            onSubmit={form.handleSubmit}
          >
            <h2 className="text-xl my-2 font-semibold leading-7 text-cyan-500 text-center mt-2">
              Wondercart
            </h2>
            {form.status && <h4 className="p-5 bg-green-100">{form.status}</h4>}

            <label htmlFor="password" className="py-2 text-slate-500 text-left">Enter your new password</label>
            <Field
              type="password"
              name="password"
              id="password"
              aria-label="password"
              className={`block flex-1 border-2 bg-transparent  p-4 xl:p-3 text-gray-900 rounded-lg placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading${form.errors.password && form.touched.password && 'border-2 border-red-500'}`}
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
                  mode="loading"
                  loadingAnimation
                  className="mt-5 mb-5 rounded-lg bg-slate-600 p-3 text-xl font-bold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  disabled
                >
                  Please wait
                </Button>
              ) : (
                <Button
                  type="submit"
                  mode="idle"
                  className="mt-5 mb-5 rounded-lg bg-slate-600 p-3 text-xl font-bold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  disabled={false}
                >
                  Update Password
                </Button>
              )
            }
            <Button
              type="button"
              className="mt-1 mb-2 text-right rounded-lg  p-3 text-base xl:text-xs font-bold text-slate-800 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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

export default NewPassword;
