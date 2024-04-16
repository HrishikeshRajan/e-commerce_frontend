/* eslint-disable max-len */
import {
  ErrorMessage,
} from 'formik';

/**
 * @author Hrishikesh Rajan
 * @description - FormFieldError is a component that renders an error message for provided formik input component name
 * @param {FormFieldErrorProps} name
 */
function FormFieldError({ name }:{ name:string }) {
  return (
    <ErrorMessage
      name={name}
      render={(msg) => (
        <div className="text-red-500 pb-2">
          {msg}
        </div>
      )}
    />
  );
}

export default FormFieldError;
