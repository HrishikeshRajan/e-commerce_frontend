import React from 'react';
/**
 * @author Hrishikesh Rajan
 *  - Types for Auth components
 */

type ButtonBaseProps = {
  children: React.ReactNode;
  className: string;
  type: 'submit' | 'reset' | 'button';
  disabled:boolean
};

type ButtonPropsIdel = ButtonBaseProps & {
  mode: 'idle';
  onClick?: () => void
};

type ButtonPropsLoading = ButtonBaseProps & {
  mode: 'loading';
  loadingAnimation: boolean;
};
export type ButtonProps = ButtonPropsIdel | ButtonPropsLoading;

/**
 * Formik error component props
 */
export type FormFieldErrorProps = 'fullname' | 'email' | 'password';
