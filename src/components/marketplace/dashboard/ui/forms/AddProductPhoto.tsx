/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable import/no-cycle */
/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import { FormikProps } from 'formik';
import { useTypedDispatch, useTypedSelector } from '@/hooks/user/reduxHooks';
import { addProductImages } from '@/utils/reduxSlice/markeplaceSlice';
import { Product } from './AddProductForm';

type FormProps = {
  form:FormikProps<Product>
  preview:boolean
  multiple:boolean
  setDatas:(buffer:File[]) => void
};

function AddProductPhoto({
  multiple = false,
  setDatas,
}:FormProps) {
  const images = useTypedSelector((store) => store.marketplace.productImages);
  const dispatch = useTypedDispatch();

  /**
   * This function handles the file change event also
   * sets the preview image
   *
   */
  const onDrop = useCallback((acceptedFiles:File[]) => {
    if (acceptedFiles.length > 4) return;
    setDatas(acceptedFiles);
    acceptedFiles.map((imagee:any) => {
      const reader = new FileReader();
      reader.onload = function onload() {
        dispatch(addProductImages(reader.result as string));
      };
      reader.readAsDataURL(imagee);
    });
  }, []);
  const {
    getRootProps, getInputProps, isDragActive,
  } = useDropzone({ onDrop });

  return (
    <div className="p-2 mb-2 ">
      {multiple && (
        <ul className="flex gap-2">
          {images.map((url:string, index:number) => <li key={index}><img src={url} alt="productphoto" width="100px" height="100px" className="my-3 w-[100px] h-[100px] border-2 border-slate-300 object-cover rounded" /></li>)}
        </ul>
      )}

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

export default AddProductPhoto;
