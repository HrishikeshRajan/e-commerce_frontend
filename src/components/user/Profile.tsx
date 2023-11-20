/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  useCallback,
  useEffect, useState,
} from 'react';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDropzone } from 'react-dropzone';
import { redirect, useNavigate } from 'react-router';
import defaultUser from '../../assets/defaultUser.png';
import { listMyProfile } from './apis/showProfile.api';
import { IUser } from '.';
import { updateProfile } from './apis/updateProfile.api';
import SuccessBox from './SuccessBox';
import AuthHelper from '../auth/apis/helper';
import { deleteImage, uploadImage } from './apis/image.api';
import { profilePicture } from './helper/getProfilePicture';
import ErrorBox from './ErrorBox';
import RedirectToSignIn from './RedirectToSignIn';
import Address from './Address';

function Profile() {
  const [user, setUser] = useState<IUser>({
    fullname: '',
    username: '',
    email: '',
    photo: {
      id: '',
      secure_url: '',
      url: '',
    },
  });
  const [edit, setEdit] = useState(false);
  const [success, setSuccess] = useState({
    state: false,
    message: '',
  });
  const [fetchError, setFetchError] = useState({
    errorState: false,
    message: '',
    redirect: false,
  });

  const [file, setFile] = useState<string | File | undefined>();
  const [dataUrl, setDataUrl] = useState<string | ArrayBuffer | null>();
  const [deletes, setDeletes] = useState(false);
  const [clientImage, setClientImage] = useState(profilePicture.getImage()?.secure_url);

  const setForm = (event:React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    const abort = new AbortController();
    const { signal } = abort;
    listMyProfile(signal).then((response:any) => {
      if (response?.statusCode <= 200 && response?.success === true) {
        setUser({ ...user, ...response.message.user });
      } else if (response?.statusCode === 401
        && response?.success === false) {
        setFetchError({ errorState: true, message: response.message?.error, redirect: true });
      } if (response?.statusCode > 401 && response?.statusCode <= 500) {
        setFetchError({ errorState: true, message: response?.message?.error, redirect: false });
      }
    });

    return () => {
      abort.abort();
    };
  }, []);

  const onSubmit = (event:React.FormEvent) => {
    event.preventDefault();
    const userData = {
      ...user,
    };
    updateProfile(userData).then((response:any) => {
      if (response?.success && response?.statusCode <= 201) {
        setSuccess({ state: true, message: 'Profile saved successfully' });
        setSuccess(response?.message.user);
      } else if (response?.statusCode === 401
        && response?.success === false) {
        setFetchError({ errorState: true, message: response.message?.error, redirect: true });
      } else {
        setFetchError({ errorState: true, message: response?.message?.error, redirect: false });
      }
    });
  };

  function hanldeImageSubmit() {
    if (typeof file === 'undefined') return;
    const form = new FormData();
    form.append('image', file);
    uploadImage(form).then((response) => {
      if (response.statusCode <= 201 && response.success) {
        AuthHelper.authenticate(response.message?.user, () => {
          setSuccess({ state: true, message: 'Image Uploaded succesfully' });
          setDeletes(!deletes);
        });
      } else if (response?.statusCode === 401
        && response?.success === false) {
        setFetchError({ errorState: true, message: response.message?.error, redirect: true });
      } else {
        setFetchError({ errorState: true, message: response.message?.error, redirect: false });
      }
    });
  }

  const deleteProfilePicture = () => {
    deleteImage().then((response:any) => {
      if (response.statusCode === 200 && response.success === true) {
        profilePicture.removeImage(() => {
          setDataUrl('');
          setClientImage('');
          setSuccess({ state: true, message: 'Image deleted succesfully' });
        });
      } else if (response?.statusCode === 401
        && response?.success === false) {
        setFetchError({ errorState: true, message: response.message?.error, redirect: true });
      } else {
        setFetchError({ errorState: true, message: response.message?.error, redirect: false });
      }
    });
  };
  const onDrop = useCallback((acceptedFiles:any) => {
    const image = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = function onload() {
      setDataUrl(reader.result);
    };
    reader.readAsDataURL(image);
    setFile(image);
  }, []);

  const {
    getRootProps, getInputProps, isDragActive,
  } = useDropzone({ onDrop });

  return (
    <div className="w-full py-5 flex flex-col lg:flex-row  items-center justify-center shadow-sm">
      {success.state && <SuccessBox {...success} set={setSuccess} />}
      {fetchError.errorState
      && !fetchError.redirect
      && <ErrorBox {...fetchError} action={setFetchError} />}
      {fetchError.redirect && <RedirectToSignIn />}
      <form method="post" className="w-full lg:w-6/12 p-5 h-fit bg-white ">
        <h2 className="text-2xl text-slate-800 font-bold ">User Profile</h2>
        <img src={dataUrl as string || clientImage || defaultUser} alt="userphoto" width="100px" height="100px" className=" my-3 w-[100px] h-[100px] object-cover rounded" />
        <div {...getRootProps()} className="border-2 border-dashed border-gray-400 p-10 bg-gray-100">
          <input {...getInputProps()} hidden onChange={hanldeImageSubmit} />
          {
            isDragActive
              ? <p>Drop the files here ...</p>
              : <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
          }
        </div>
        <div className="my-2">
          <button type="button" onClick={hanldeImageSubmit} className="bg-cyan-300 mx-1 py-1 w-20 px-2 shadow-md rounded text-white fond-bold">Upload</button>
          {(dataUrl || clientImage) && <button type="button" onClick={deleteProfilePicture} className="bg-red-300 mx-1 py-1 px-2 w-20 shadow-md rounded text-white fond-bold">Delete</button> }
        </div>
        <hr className="my-3" />
        <div className="">
          <h2 className="text-lg font-medium text-slate-600 py-3">{edit ? 'Edit your profile' : 'Your Details'}</h2>
          <label htmlFor="fullname">Fullname</label>
          <input type="text" id="fullname" value={user.fullname} name="fullname" onChange={setForm} className="inline-block my-1 w-full flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" required disabled={!edit} />
          <label htmlFor="username">Username</label>
          <input type="username" name="username" value={user.username} onChange={setForm} className="inline-block my-1 w-full flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" required disabled={!edit} />
          <label htmlFor="email" className=" disabled:opacity-75 select-none cursor-not-allowed">Email</label>
          <input data-tooltip-target="tooltip-default" type="email" name="email" value={user.email} onChange={setForm} className="inline-block my-1 w-full flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 disabled:opacity-75 select-none cursor-not-allowed" readOnly disabled />
          <small className="pr-2 text-slate-500">You can&apos;t change your email</small>
        </div>
        <div className="w-full flex justify-between my-2">
          { !edit && (
            <button type="button" onClick={() => setEdit(!edit)}>
              <FontAwesomeIcon className="text-slate-700" icon={faPenToSquare} />
              <span className="text-xs mx-1">Edit</span>
            </button>
          )}
          { edit && (
            <button type="button" className=" font-medium bg-slate-500 text-white rounded text-sm px-5 py-2.5 " onClick={() => setEdit(!edit)}>
              Cancel
            </button>
          )}
          <button onClick={onSubmit} type="button" className="text-white bg-blue-400 dark:bg-blue-500  font-medium rounded text-sm px-5 py-2.5 ">Save</button>

        </div>
      </form>

      <Address address={user?.address} />
    </div>
  );
}

export default Profile;
