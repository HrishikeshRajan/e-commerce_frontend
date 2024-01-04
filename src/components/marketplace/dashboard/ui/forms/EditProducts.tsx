/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-cycle */
import React, { useEffect, useState } from 'react';
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik';

import { toFormikValidationSchema } from 'zod-formik-adapter';
import { StatusCodes } from 'http-status-codes';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useTypedDispatch, useTypedSelector } from 'hooks/user/reduxHooks';
import { useNavigate, useParams } from 'react-router-dom';
import { removeUser } from 'utils/reduxSlice/appSlice';
import Loading from '@/utils/animations/Loading';
import { merge } from 'lodash';
import { IoIosArrowBack } from 'react-icons/io';
import { addProductToEdit } from '@/utils/reduxSlice/productSlice';
import AuthHelper from '../../../../auth/apis/helper';
import AddProductPhoto from './AddProductPhoto';
import { getProductById } from '../../pages/products/apis/getProductById';
import { UpdateProduct } from '../../pages/products/apis/updateProduct';
import { ProductCoreSchema } from '../../pages/products/types';

function EditProductForm() {
  const dispatch = useTypedDispatch();
  const [discontinued, setDiscontinued] = useState(false);
  const [files, setFiles] = useState<File[]>();
  const params = useParams();

  const setFilesData = (buffers:File[]) => setFiles(buffers);

  const navigate = useNavigate();

  const product = useTypedSelector((store) => store.products.productToEdit);
  const toggleDiscontinued = () => {
    setDiscontinued(!discontinued);
  };

  const fileObj = {
    files: {
      images: files,
    },
  };

  useEffect(() => {
    getProductById(params.id as string).then((response) => {
      if (response.statusCode === 200) {
        dispatch(addProductToEdit(response.message?.product));
      }
    });
  }, [dispatch, params.id]);

  return (
    <div className="flex  mt-36 lg:mt-20   w-full justify-center p-5">

      <Formik
        initialValues={{
          name: product.name,
          price: product.price,
          currencyCode: product.currencyCode,
          description: product.description,
          category: product.category,
          brand: product.brand,
          sizes: product.sizes.toString(),
          color: product.color,
          gender: product.gender,
          isDiscontinued: product.isDiscontinued,
          keywords: product.keywords.toString(),
          id: product.id,
          shopId: product.shopId,
        }}
        validationSchema={toFormikValidationSchema(ProductCoreSchema)}
        onSubmit={(values, actions) => {
          merge(values, fileObj);
          UpdateProduct({ ...values }).then((response) => {
            actions.setSubmitting(false);
            if (response.statusCode === StatusCodes.OK && response.OK) {
              toast.success('Successfully saved');
            } else if (response?.statusCode === StatusCodes.UNAUTHORIZED
              && response?.success === false) {
              AuthHelper.clearSignedOnData();
              dispatch(removeUser());
              navigate('/auth');
            }
          });
        }}
        enableReinitialize
      >
        {(form) => (
          <div className="w-full justify-center">
            <button type="button" className="flex mt-3 items-center gap-2 border-2 border-slate-100 rounded p-1 shadow-sm hover:scale-105 active:scale-105" onClick={() => navigate(-1)}>
              <IoIosArrowBack />
              Back to List
            </button>
            <Form className=" shadow-md  sm:w-5/6 p-5">
              <h1 className=" text-slate-500 py-2 mb-1 text-4xl font-semibold">
                Edit Product
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
                <ErrorMessage
                  name="name"
                  render={(msg) => (
                    <div className="text-red-500 pb-2">
                      {msg}
                    </div>
                  )}
                />
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
                <ErrorMessage
                  name="description"
                  render={(msg) => (
                    <div className="text-red-500 pb-2">
                      {msg}
                    </div>
                  )}
                />
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
                <ErrorMessage
                  name="category"
                  render={(msg) => (
                    <div className="text-red-500 pb-2">
                      {msg}
                    </div>
                  )}
                />
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

                <ErrorMessage
                  name="gender"
                  render={(msg) => (
                    <div className="text-red-500 pb-2">
                      {msg}
                    </div>
                  )}
                />
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
                <ErrorMessage
                  name="brand"
                  render={(msg) => (
                    <div className="text-red-500 pb-2">
                      {msg}
                    </div>
                  )}
                />
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
                <ErrorMessage
                  name="color"
                  render={(msg) => (
                    <div className="text-red-500 pb-2">
                      {msg}
                    </div>
                  )}
                />
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
                <ErrorMessage
                  name="sizes"
                  render={(msg) => (
                    <div className="text-red-500 pb-2">
                      {msg}
                    </div>
                  )}
                />
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
                <ErrorMessage
                  name="price"
                  render={(msg) => (
                    <div className="text-red-500 pb-2">
                      {msg}
                    </div>
                  )}
                />
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
                      checked={form.values.isDiscontinued || discontinued}
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
              <div className="mb-5">
                <label htmlFor="keywords" className="block mb-2 text-sm font-medium text-gray-900 ">Enter 5 keywords for this product</label>
                <Field
                  type="text"
                  id="keywords"
                  name="keywords"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 ${form.errors.keywords && form.touched.keywords && 'border-2 border-red-500'} `}
                  placeholder="Write 5 keywords for your products"
                />
                <ErrorMessage
                  name="keywords"
                  render={(msg) => (
                    <div className="text-red-500 pb-2">
                      {msg}
                    </div>
                  )}
                />
              </div>

              <h3 className="block mt-10 text-sm font-bold text-gray-900 ">
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

                  : <button type="submit" className="text-white bg-slate-800 hover:bg-slate-700 outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Update</button>

              }
            </Form>
          </div>
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

export default EditProductForm;
