/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { useTypedDispatch, useTypedSelector } from 'hooks/user/reduxHooks';
import { setShopLogo } from 'utils/reduxSlice/markeplaceSlice';
import { FormikProps } from 'formik';
import defaultLogo from '../../../../../assets/defaultUser.png';

type FormProps = {
  form:FormikProps<{
    name: string
    description: string
    address: string
    email: string
    logo: string
  }>
};
function AddLogo({ form }:FormProps) {
  const [dataUrl, setDataUrl] = useState<string | ArrayBuffer | null>();

  const dispatch = useTypedDispatch();
  const existingImage = useTypedSelector((store) => store.marketplace.shop.currentShop.logo.secure_url);

  /**
   * This function handles the file change event also
   * sets the preview image
   *
   */
  const onDrop = useCallback((acceptedFiles:any) => {
    const image = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = function onload() {
      setDataUrl(reader.result);
      form.setTouched({ logo: true });
      form.setFieldValue('logo', dataUrl, true);
      dispatch(setShopLogo(reader.result as string));
    };
    reader.readAsDataURL(image);
  }, []);
  const {
    getRootProps, getInputProps, isDragActive,
  } = useDropzone({ onDrop });

  return (
    <div className="p-2 mb-2">
      <img src={dataUrl as string || existingImage || defaultLogo} alt="userphoto" width="100px" height="100px" className={`my-3 w-[100px] h-[100px] object-cover rounded ${form.values.logo === '' && form.touched.logo ? 'border border-red-900' : ''}`} />
      {(form.values.logo === '') && form.touched.logo ? (
        <div className="text-red-500 pb-2">
          Required
        </div>
      ) : ''}
      <div {...getRootProps()} className="border-2 border-dashed border-gray-400 p-10 bg-gray-100">
        <input {...getInputProps()} hidden />
        {
          isDragActive
            ? <p>Drop the files here ...</p>
            : <p>Drag &apos;n&apos; drop your shop logo here, or click to select files</p>
        }
      </div>

    </div>

  );
}

export default AddLogo;
