/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { errorParser, signup } from './apis/signup.api';

function Signup() {
  const [fields, setFields] = useState({
    fullname: '',
    email: '',
    password: '',
  });

  const [errorStatus, setErrorStatus] = useState({
    fullname: '',
    email: '',
    password: '',
    error: false,
  });

  const [successMsg, setSuccessMsg] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const user = {
      fullname: fields.fullname || undefined,
      email: fields.email || undefined,
      password: fields.password || undefined,
    };

    signup(user).then((response: any) => {
      if (!response.success) {
        const error = errorParser(response);
        const errorObj = {
          fullname: error?.fullname || '',
          email: error?.email || '',
          password: error?.password || '',
          error: error?.error || false,
        };
        setErrorStatus(errorObj);
      }
      if (response.success) {
        const errorObj = {
          fullname: '',
          email: '',
          password: '',
          error: false,
        };
        setErrorStatus(errorObj);
        setSuccessMsg(response.message.message);
      }
    });
  };
  return (
    <form
      className="w-10/12 lg:w-4/12 border-2 border-gray-300 rounded flex flex-col p-2 lg:p-5"
    >
      <h2 className="text-xl font-semibold leading-7 text-gray-900 text-center mt-2">
        Sign Up
      </h2>
      {successMsg && (
        <h4 className="text-green-500 p-3 font-bold bg-green-50 my-2 rounded">
          {successMsg}
        </h4>
      )}
      <label htmlFor="fullname">Fullname</label>
      <input
        type="text"
        name="fullname"
        id="fullname"
        aria-label="fullname"
        className={`block flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ${
          errorStatus.error && errorStatus.fullname && 'border-red-500'
        }`}
        onChange={handleChange}
        value={fields.fullname}
      />
      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1 select-none">
        {errorStatus.error && errorStatus.fullname}
      </span>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        aria-label="email"
        value={fields.email}
        onChange={handleChange}
        className={`block flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ${
          errorStatus.error && errorStatus.email && 'border-red-500'
        }`}
      />
      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1 select-none">
        {errorStatus.error && errorStatus.email}
      </span>

      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        aria-label="password"
        value={fields.password}
        onChange={handleChange}
        className={`block flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ${
          errorStatus.error && errorStatus.password && 'border-red-500'
        }`}
      />
      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1 select-none">
        {errorStatus.error && errorStatus.password}
      </span>
      <button
        type="submit"
        onClick={onSubmit}
        className="mt-4 mb-5 rounded bg-slate-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Sign Up
      </button>
    </form>
  );
}

export default Signup;
