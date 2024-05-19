/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-cycle */
import { useState } from 'react';
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik';

import { toFormikValidationSchema } from 'zod-formik-adapter';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Loading from '@/utils/animations/Loading';
import { merge } from 'lodash';
import { ErrorResponse, FetchApiResponse, hasRequestSucceeded } from '@/types/Fetch';
import FormFieldError from '@/utils/FormikError';
import { createNewProduct, Product } from '../../pages/products/apis/createProduct';
import AddProductPhoto from './AddProductPhoto';
import { ProductCoreSchema } from '../../pages/products/types';

function AddProductForm() {
  const [discontinued, setDiscontinued] = useState(false);
  const [files, setFiles] = useState<File[]>();
  const params = useParams();

  const setFilesData = (buffers:File[]) => setFiles(buffers);

  const toggleDiscontinued = () => {
    setDiscontinued(!discontinued);
  };

  const fileObj = {
    files: {
      images: files,
    },
  };

  return (
    <div className="flex top-full mt-20 lg:mt-20 xl:w-6/12  xl:left-96  mx-auto xl:absolute w-full justify-center ">

      <Formik
        initialValues={{
          name: '',
          price: '',
          currencyCode: '',
          description: '',
          category: '',
          brand: '',
          sizes: '',
          color: '',
          gender: '',
          isDiscontinued: false,
          shopId: params.id!,
          stock: '',
        }}
        validationSchema={toFormikValidationSchema(ProductCoreSchema.omit({ id: true }))}
        onSubmit={(values, actions) => {
          merge(values, fileObj);
          createNewProduct({ ...values })
            .then((response:FetchApiResponse<{ product:Product } | ErrorResponse>) => {
              actions.setSubmitting(false);
              if (hasRequestSucceeded(response)) {
                toast.success('Successfully saved');
              }
            }).catch((e) => {
              toast.error((e as Error).message);
            });
        }}
      >
        {(form) => (
          <Form className=" shadow-md sm:w-5/6 p-2">
            <h1 className=" text-slate-500 py-2 mb-1 text-xl font-semibold">
              Add New Product
            </h1>

            <div className="my-5">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Name of Product</label>
              <Field
                type="text"
                id="name"
                name="name"
                className={`bg-gray-50  text-gray-900 border text-sm rounded-lg block w-full p-2.5    ${form.errors.name && form.touched.name && 'border-2 border-red-500'}`}
                placeholder="Your product name"
              />
              <FormFieldError name="name" />
            </div>

            <div className="mb-5">

              <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 ">Description of Product</label>
              <Field
                as="textarea"
                id="description"
                name="description"
                rows={4}
                className={`outline-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border ${form.errors.description && form.touched.description && 'border-2 border-red-500'}`}
                placeholder="Write description about your product"
              />
              <FormFieldError name="description" />
            </div>
            <div className="mb-5">
              <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 ">Category of Product</label>
              <Field
                type="text"
                id="category"
                name="category"
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 ${form.errors.category && form.touched.category && 'border-2 border-red-500'} `}
                placeholder="Category of product"
              />
              <FormFieldError name="category" />
            </div>
            <div className="mb-5">
              <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 ">Genders</label>

              <div role="group" className="w-full flex justify-start gap-10">
                <label htmlFor="male">
                  <Field type="radio" id="male" name="gender" value="Male" className="m-2" />
                  Male
                </label>
                <label htmlFor="female">
                  <Field type="radio" id="female" name="gender" value="Female" className="m-2" />
                  Female
                </label>
                <label htmlFor="unisex">
                  <Field type="radio" id="unisex" name="gender" value="Unisex" className="m-2" />
                  Unisex
                </label>

              </div>

              <FormFieldError name="gender" />
            </div>

            <div className="mb-5">
              <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 ">Brand Name</label>
              <Field
                type="text"
                id="brand"
                name="brand"
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 ${form.errors.brand && form.touched.brand && 'border-2 border-red-500'} `}
                placeholder="Your brand name"
              />
              <FormFieldError name="brand" />
            </div>

            <div className="mb-5">
              <label htmlFor="color" className="block mb-2 text-sm font-medium text-gray-900 ">Color of Product</label>
              <Field
                type="text"
                id="color"
                name="color"
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 ${form.errors.color && form.touched.color && 'border-2 border-red-500'} `}
                placeholder="Color of Product"
              />
              <FormFieldError name="color" />
            </div>

            <div className="mb-5">
              <label htmlFor="sizes" className="block mb-2 text-sm font-medium text-gray-900 ">Available Sizes</label>
              <Field
                type="text"
                id="sizes"
                name="sizes"
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 ${form.errors.sizes && form.touched.sizes && 'border-2 border-red-500'} `}
                placeholder="Your product sizes"
              />
              <FormFieldError name="sizes" />
            </div>

            <div className="mb-5">
              <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 ">Selling Price of Product</label>
              <Field
                type="number"
                id="price"
                name="price"
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 ${form.errors.price && form.touched.price && 'border-2 border-red-500'} `}
                placeholder="Your Product price"
              />
              <FormFieldError name="price" />
            </div>

            <div className="mb-5">
              <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-900 ">Total stock available</label>
              <Field
                type="number"
                id="stock"
                name="stock"
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 ${form.errors.price && form.touched.price && 'border-2 border-red-500'} `}
                placeholder="Your product stock"
              />
              <FormFieldError name="stock" />
            </div>
            <div className="mb-5">

              <div className="flex flex-col">
                <label htmlFor="isDiscontinued" className="block mb-2 text-sm font-medium text-gray-900 ">Is product discontinued?</label>
                <label htmlFor="isDiscontinued" className="relative inline-flex mt-3 items-center cursor-pointer">
                  <input
                    id="isDiscontinued"
                    onChange={() => {
                      toggleDiscontinued();
                      form.setFieldValue('isDiscontinued', !discontinued, true);
                    }}
                    type="checkbox"
                    name="isDiscontinued"
                    className="sr-only peer"
                    checked={discontinued}
                  />
                  <div className="w-11 h-6 bg-gray-200  dark:peer-focus:ring-slate-600 rounded-full peer dark:bg-gray-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-0 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-0  after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-green-300">{discontinued && <small>Yes</small>}</div>
                  {!discontinued && <small>No</small>}
                </label>

              </div>
              <ErrorMessage
                name="isDiscontinued"
                render={(msg) => (
                  <div className="text-red-500 pb-2">
                    {msg}
                  </div>
                )}
              />
            </div>

            <h3 className="block mt-10 text-sm font-medium text-gray-900 ">
              Upload images of product (4 images)

            </h3>
            <AddProductPhoto
              preview
              multiple
              setDatas={setFilesData}
            />

            {
              form.isSubmitting
                ? (
                  <button type="button" className="text-white bg-slate-800 hover:bg-slate-700 outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:bg-opacity-60" disabled>
                    <Loading />
                    Please wait
                  </button>
                )

                : <button type="submit" className="text-white bg-slate-800 hover:bg-slate-700 outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Create</button>

            }
          </Form>
        )}

      </Formik>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default AddProductForm;
