/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import defaultUser from '../../assets/defaultUser.png';
import { listMyProfile } from './apis/showProfile.api';
import { IUser } from '.';
import { updateProfile } from './apis/updateProfile.api';
import SuccessBox from './SuccessBox';
import EmailToolTip from './EmailToolTip';

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
  const [success, setSuccess] = useState<any>();
  const [errorOnFetch, setErrorOnFetch] = useState<any>();
  const setForm = (event:React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    const abort = new AbortController();
    const { signal } = abort;
    listMyProfile(signal).then((result:any) => {
      if (result?.statusCode === 200 && result?.success === true) {
        setUser({ ...user, ...result.message.user });
      } else {
        setErrorOnFetch(result?.message);
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
    updateProfile(userData).then((result:any) => {
      if (result?.success && result?.statusCode === 200) {
        setSuccess(result?.message.user);
      } else {
        setSuccess({});
        setErrorOnFetch(result?.message.error);
      }
    });
  };

  return (
    <div className="w-full py-10 flex justify-center">
      {success && <SuccessBox />}
      <form method="post" className="w-full lg:w-6/12 p-5 h-fit bg-white shadow-md">
        <h2 className="text-2xl text-slate-800 font-bold ">User Profile</h2>

        <div>
          <img src={defaultUser} alt="userphoto" className="w-20 my-3" />
          <div className="my-2">
            <button type="button" className="bg-cyan-300 mx-1 py-1 w-20 px-2 shadow-md rounded text-white fond-bold">Upload</button>
            <button type="button" className="bg-red-300 mx-1 py-1 px-2 w-20 shadow-md rounded text-white fond-bold">Delete</button>
          </div>
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
          <button type="button" onClick={onSubmit} className="text-white bg-blue-400 dark:bg-blue-500  font-medium rounded text-sm px-5 py-2.5 ">Submit</button>

        </div>
      </form>
    </div>
  );
}

export default Profile;
