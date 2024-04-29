import FormFieldError from '@/utils/FormikError';
import { Formik, Form, Field } from 'formik';
import {
  ErrorResponse, FetchApiResponse, hasRequestSucceeded, isFetchUnprocessableEntityError,
} from '@/types/Fetch';
import { ClientReview, ReviewZodSchema } from '@/types/Review';
import { transformZodToFormikErrors } from '@/components/user/address/helpers/validationSchema';
import { ZodError } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { ToastContainer, toast } from 'react-toastify';
import Loading from '@/utils/animations/Loading';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { merge } from 'lodash';
import { RateStar } from './RateStar';
import { createReview } from '../api/createReview';

type CreateFormProps = { cancel:() => void, productId:string, userId:string | undefined };
function CreateForm({ cancel, productId, userId }:CreateFormProps) {
  const [rating, setRating] = useState(0);
  return (
    <>
      <Formik
        initialValues={{
          star: 0,
          title: '',
          description: '',
          productId,
          userId: userId || '',
        }}
        validationSchema={toFormikValidationSchema(ReviewZodSchema)}
        onSubmit={(values, actions) => {
          actions.setSubmitting(true);
          merge(values, { star: rating });
          createReview(values)
            .then((response: FetchApiResponse<{ comment: ClientReview; }> | ErrorResponse) => {
              actions.setStatus('');
              actions.setSubmitting(false);
              if (hasRequestSucceeded(response)) {
                toast.success('Your review added successfully');
              } else if (isFetchUnprocessableEntityError(response)) {
                actions.setErrors(transformZodToFormikErrors(new ZodError(response.error)));
              } else {
                toast.error('Failed to add the review');
              }
            }).catch(() => {
              actions.setSubmitting(false);
              toast.error('Failed to add the review');
            });
        }}
      >
        {(form) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="Rating" className="block text-gray-500 font-semibold mb-2">
                How would you rate it?
              </label>
              <RateStar rating={rating} setRating={setRating} className="flex gap-2 mb-4" />

              <label htmlFor="title" className="block text-gray-500 font-semibold mb-2">
                Title your review
              </label>
              <Field
                type="text"
                id="title"
                name="title"
                placeholder="What's most impotant to know?"
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <FormFieldError name="title" />
            </div>
            <div className="mb-6">
              <label htmlFor="description" className="block text-gray-500 font-semibold mb-2">Write your review</label>
              <Field
                as="textarea"
                id="description"
                name="description"
                rows="5"
                placeholder="What didi you like or dislike? What did you use this product for?"
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <FormFieldError name="description" />
            </div>
            {form.isSubmitting ? (
              <button
                type="button"
                disabled
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                <Loading />
                {' '}
                Updating
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={cancel}
                  className="bg-slate-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
              </div>
            )}
          </Form>
        )}

      </Formik>
      <ToastContainer hideProgressBar />
    </>
  );
}

export default CreateForm;
