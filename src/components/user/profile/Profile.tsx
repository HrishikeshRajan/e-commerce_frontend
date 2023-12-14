/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik';
import { StatusCodes } from 'http-status-codes';
import { useNavigate } from 'react-router-dom';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { ToastContainer, toast } from 'react-toastify';
import { ZodError } from 'zod';
import { updateProfile } from '../apis/updateProfile.api';
import AuthHelper from '../../auth/apis/helper';
import Image from './Image';
import { useTypedDispatch, useTypedSelector } from '../../../hooks/user/reduxHooks';
import { addUser, removeUser } from '../../../utils/reduxSlice/appSlice';
import { editProfileSchema } from '../helper/validationSchema';
import Loading from '../../../utils/animations/Loading';
import 'react-toastify/dist/ReactToastify.css';
import { transformZodToFormikErrors } from '../address/helpers/validationSchema';

function Profile() {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const [edit, setEdit] = useState(false);

  const userDetails = useTypedSelector((store) => store.app.user);

  return (
    <div className="w-full  flex flex-col   shadow-sm">
      <Image />
      <Formik
        initialValues={
          {
            fullname: userDetails?.fullname || '',
            username: userDetails?.username || '',
            email: userDetails?.email || '',
          }
        }
        validationSchema={toFormikValidationSchema(editProfileSchema)}
        onSubmit={(values, actions) => {
          actions.setSubmitting(true);
          updateProfile({ ...values }).then((response:any) => {
            actions.setSubmitting(false);
            toast.success('Successfully saved');
            if (response?.success && response?.statusCode <= StatusCodes.OK) {
              dispatch(addUser(response.message?.user));
              // AuthHelper.updateAuthenticatedUserData(response.message?.user);
            } else if (response?.statusCode === StatusCodes.UNAUTHORIZED
              && response?.success === false) {
              AuthHelper.clearSignedOnData();
              dispatch(removeUser());
              navigate('/auth');
            } else if (response.statusCode === StatusCodes.UNPROCESSABLE_ENTITY) {
              actions.setErrors(transformZodToFormikErrors(new ZodError(response.message?.error)));
            }
          });
        }}
      >
        {(form) => (
          <Form method="post" className="w-full lg:w-full p-5  bg-white ">
            <hr className="my-3" />
            <div className="">
              <h2 className="text-2xl text-slate-800 font-bold ">{edit ? 'Edit Your Profile' : 'Manage Profile'}</h2>
              <label htmlFor="fullname">Fullname</label>
              <Field type="text" id="fullname" name="fullname" className="inline-block my-1 w-full flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" disabled={!edit} />
              <ErrorMessage
                name="fullname"
                render={(msg) => (
                  <div className="text-red-500 pb-2">
                    {msg}
                  </div>
                )}
              />
              <label htmlFor="username">Username</label>
              <Field type="text" name="username" className="inline-block my-1 w-full flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" required disabled={!edit} />
              <ErrorMessage
                name="username"
                render={(msg) => (
                  <div className="text-red-500 pb-2">
                    {msg}
                  </div>
                )}
              />
              <label htmlFor="email" className=" disabled:opacity-75 select-none cursor-not-allowed">Email</label>
              <Field type="email" name="email" className="inline-block my-1 w-full flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 disabled:opacity-75 select-none cursor-not-allowed" readOnly disabled />
              <small className="pr-2 text-slate-500">You can&apos;t change your email</small>
              <ErrorMessage
                name="email"
                render={(msg) => (
                  <div className="text-red-500 pb-2">
                    {msg}
                  </div>
                )}
              />
            </div>
            <div className="w-full flex justify-between my-2">
              { !edit && (
                <button type="button" className="bg-slate-200 px-5 py-2.5 rounded" onClick={() => setEdit(!edit)}>
                  <FontAwesomeIcon className="text-slate-700" icon={faPenToSquare} />
                  <span className="text-xs mx-1">Edit</span>
                </button>
              )}
              { edit && (
                <button type="button" className=" font-medium bg-slate-500 text-white rounded text-sm px-5 py-2.5 " onClick={() => setEdit(!edit)}>
                  Cancel
                </button>
              )}
              {form.isSubmitting
                ? (
                  <button type="button" className="text-white bg-slate-500 dark:bg-slate-500  font-medium rounded text-sm px-5 py-2.5 " disabled>
                    <Loading />
                    Saving
                  </button>
                )
                : edit && <button type="submit" className="text-white bg-sky-600  font-medium rounded text-sm px-5 py-2.5 ">Save</button> }

            </div>
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

export default Profile;
