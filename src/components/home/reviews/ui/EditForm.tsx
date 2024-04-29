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
import { useTypedDispatch } from '@/hooks/user/reduxHooks';
import { setClientReviews } from '@/utils/reduxSlice/reviewSlice';
import { normalizeReviews } from '@/hooks/useFetchProductReviews';
import { editReview } from '../api/editReview';

function EditForm({ review, cancel }:{ review:ClientReview, cancel:() => void }) {
  const dispatch = useTypedDispatch();
  return (
    <>
      <Formik
        initialValues={{
          star: review.star,
          title: review.title,
          description: review.description,
          productId: review.productId,
        }}
        validationSchema={toFormikValidationSchema(ReviewZodSchema)}
        onSubmit={(values, actions) => {
          actions.setSubmitting(true);
          editReview(values, review._id)
            .then((response: FetchApiResponse<{ comment: ClientReview; }> | ErrorResponse) => {
              actions.setStatus('');
              actions.setSubmitting(false);
              if (hasRequestSucceeded(response)) {
                dispatch(setClientReviews(normalizeReviews([response.message.comment])));
                toast.success('Your review added successfully', { position: 'bottom-center' });
              } else if (isFetchUnprocessableEntityError(response)) {
                actions.setErrors(transformZodToFormikErrors(new ZodError(response.error)));
              } else {
                toast.error('Failed to add the review', { position: 'bottom-center' });
              }
            }).catch(() => {
              actions.setSubmitting(false);
              toast.error('Failed to add the review', { position: 'bottom-center' });
            });
        }}
      >
        {(form) => (
          <Form>
            <div className="mb-4">

              <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                Title
              </label>
              <Field
                type="text"
                id="title"
                name="title"
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <FormFieldError name="title" />
            </div>
            <div className="mb-6">
              <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
              <Field
                as="textarea"
                id="description"
                name="description"
                rows="5"
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
      <ToastContainer />
    </>
  );
}

export default EditForm;
