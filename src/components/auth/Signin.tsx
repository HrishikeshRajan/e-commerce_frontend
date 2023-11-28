/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { signin, errorParser } from './apis/signin.api';
import AuthHelper from './apis/helper';
import { useTypedDispatch } from '../../hooks/user/reduxHooks';
import { addUser, confirmAuthentication } from '../../utils/reduxSlice/appSlice';

function Signin():React.JSX.Element {
  const dispatch = useTypedDispatch();
  const [fields, setFields] = useState({
    email: '',
    password: '',
  });

  const [errorStatus, setErrorStatus] = useState({
    email: '',
    password: '',
    error: false,
  });

  const [mainError, setMainError] = useState({
    accountError: false,
    message: '',
  });
  const [redirects, setRedirect] = useState(false);

  if (redirects) {
    return <Navigate to="/" />;
  }
  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const user = {
      email: fields.email || undefined,
      password: fields.password || undefined,
    };
    signin(user).then((response: any) => {
      if (!response.success && response.statusCode === 422) {
        const error = errorParser(response);
        const errorObj = {
          email: error?.email || '',
          password: error?.password || '',
          error: error?.error || false,
        };
        return setErrorStatus(errorObj);
      }
      if (
        !response.success
        && response.message.error
        && response.statusCode === 400
      ) {
        const errorObj = {
          email: '',
          password: '',
          error: false,
        };
        setErrorStatus(errorObj);
        setMainError({ accountError: true, message: response.message.error });
        return;
      }
      if (response.success) {
        const errorObj = {
          email: '',
          password: '',
          error: false,
        };

        dispatch(addUser(response.message?.user));
        dispatch(confirmAuthentication(true));
        AuthHelper.authenticate(response.message.user, () => {
          setErrorStatus(errorObj);
          setRedirect(true);
        });
      }
    });
  };

  return (
    <form
      className="w-10/12 lg:w-4/12 border-2 border-gray-300 rounded flex flex-col p-2 lg:p-5"
    >
      <h2 className="text-xl font-semibold leading-7 text-gray-900 text-center mt-2">
        Sign In
      </h2>
      {mainError.accountError && (
        <h4
          data-testid="e"
          className="text-red-500 p-3 font-bold bg-red-50 my-2 rounded"
        >
          {mainError.message}
        </h4>
      )}
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        aria-label="email"
        value={fields.email}
        onChange={handleFieldChange}
        className="block flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
      />
      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1 select-none">
        {errorStatus.error && errorStatus.email}
      </span>
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={fields.password}
        aria-label="password"
        onChange={handleFieldChange}
        className="block flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
      />
      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1 select-none">
        {errorStatus.error && errorStatus.password}
      </span>
      <button
        type="submit"
        className="mt-4 mb-5 rounded bg-slate-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={onSubmit}
      >
        Signin
      </button>
    </form>
  );
}

export default Signin;
