/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
/* eslint-disable no-nested-ternary */
import Loading from '@/utils/animations/Loading';
import React from 'react';
import { ButtonProps } from '.';

/**
 * @author Hrishikesh Rajan
 *
 * @description - Button component that renders a button element with dynamic behavior based on the provided props.
 *
 * This component supports two modes: "idle" and "loading".
 * - In "idle" mode, the button is interactive, and its label is determined by the `value` prop.
 * - In "loading" mode, the button is disabled, and it displays a loading indicator with value `loading`.
 *
 */
function Button(props:ButtonProps) {
  if (props.mode === 'idle') {
    return (
      <button
        type={props.type}
        className={props.className}
        onClick={props.onClick || undefined}
      >
        { props.children }
      </button>
    );
  }
  return (
    <button
      type={props.type}
      className={props.className}
      disabled={props.mode === 'loading' && props.disabled}
    >
      {props.mode === 'loading' && 'loading' && ((props.loadingAnimation ? <Loading /> : ''))}
    </button>
  );
}

export default Button;
