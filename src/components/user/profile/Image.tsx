/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { StatusCodes } from 'http-status-codes';
import { ToastContainer, toast } from 'react-toastify';
import defaultUser from '../../../assets/defaultUser.png';
import { profilePicture } from '../helper/getProfilePicture';
import { deleteImage, uploadImage } from '../apis/image.api';
import AuthHelper from '../../auth/apis/helper';
import { useTypedDispatch } from '../../../hooks/user/reduxHooks';
import { addUser } from '../../../utils/reduxSlice/appSlice';
import 'react-toastify/dist/ReactToastify.css';

function Image() {
  const [file, setFile] = useState<string | File | undefined>();
  const [dataUrl, setDataUrl] = useState<string | ArrayBuffer | null>();
  const [clientImage, setClientImage] = useState(profilePicture.getImage()?.secure_url);
  const [imageSubmit, setImageSubmit] = useState(false);

  const dispatch = useTypedDispatch();
  // Wrapper function that changes the state of form submission
  const isSubmitting = (status:boolean) => setImageSubmit(status);

  const deleteProfilePicture = () => {
    deleteImage().then((response:any) => {
      if (response.statusCode === StatusCodes.OK && response.success === true) {
        profilePicture.removeImage(() => {
          setDataUrl('');
          setClientImage('');
          setFile('');
        });
        toast.success('Profile Picture deleted.');
      } else {
        toast.error('Failed to delete profile picture');
      }
    });
  };

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
    };
    reader.readAsDataURL(image);
    setFile(image);
  }, []);
  const {
    getRootProps, getInputProps, isDragActive,
  } = useDropzone({ onDrop });

  function handleImageSubmit() {
    if (typeof file === 'undefined') return;

    isSubmitting(true);

    const form = new FormData();
    form.append('image', file);

    uploadImage(form).then((response) => {
      isSubmitting(false);
      if (response.statusCode <= StatusCodes.OK && response.success) {
        dispatch(addUser(response.message?.user));
        AuthHelper.authenticate(response.message?.user);
        toast.success('Profile Picture saved.');
      } else {
        toast.error('Failed to upload profile picture');
      }
    });
  }
  return (
    <>
      <div className="p-5 w-full">
        <h2 className="text-xl text-slate-700 font-bold ">Manage Profile Picture</h2>
        <img src={dataUrl as string || clientImage || defaultUser} alt="userphoto" width="100px" height="100px" className=" my-3 w-[100px] h-[100px] object-cover rounded" />
        <div {...getRootProps()} className="border-2 border-dashed border-gray-400 p-10 bg-gray-100">
          <input {...getInputProps()} hidden onChange={handleImageSubmit} />
          {
            isDragActive
              ? <p>Drop the files here ...</p>
              : <p>Drag &apos;n&apos; drop your profile picture here, or click to select files</p>
          }
        </div>
        <div className="my-2">
          {file && (imageSubmit ? <button type="button" className="bg-cyan-300 mx-1 py-1 w-20 px-2 shadow-md rounded text-white fond-bold disabled:opacity-70" disabled>Updating</button> : <button type="button" onClick={handleImageSubmit} className="bg-cyan-300 mx-1 py-1 w-20 px-2 shadow-md rounded text-white fond-bold">Upload</button>) }
          {(dataUrl || clientImage) && !imageSubmit && <button type="button" onClick={deleteProfilePicture} className="bg-red-500 mx-1 py-1 px-2 w-20 shadow-md rounded text-white fond-bold">Delete</button> }
        </div>
      </div>
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
    </>

  );
}

export default Image;
