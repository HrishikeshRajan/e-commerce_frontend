/* eslint-disable import/no-extraneous-dependencies */
import { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import PuffLoader from 'react-spinners/PuffLoader';
import { MdOutlineMailLock } from 'react-icons/md';
import { FcExpired } from 'react-icons/fc';
import Button from '../auth/ui/Button';

type ValidatingScreenProps = {
  response:{ message:string, meta:string } | undefined,
  loading:boolean,
  error:string };
function ValidatingScreen({ response, loading, error }: ValidatingScreenProps) {    
  const navigate = useNavigate();
<<<<<<< HEAD:src/components/error/ValidatingScreen.tsx
=======
  const [response, loading, verifyError] = useTokenVerify(search);
>>>>>>> 9e1a1bc740c710eccd4f2baec2a76aee4bbe5ffa:src/components/error/ConfirmEmail.tsx
  const override: CSSProperties = {
    display: 'block',
    margin: '0 auto',
    borderColor: 'red',
  };
  return (
    <div className="w-full bg-cyan-500 h-screen flex justify-center items-center">

      <div className="w-full px-3 text-center">
        <h2 className="text-2xl text-white font-extrabold flex justify-center items-center my-4 gap-2">
          Wondercart
          <MdOutlineMailLock />
        </h2>
        {loading && <h2 className="text-xl text-slate-50 pb-10">Please wait while we confirm your email.</h2>}

<<<<<<< HEAD:src/components/error/ValidatingScreen.tsx
        {error && (
          <h2 className="text-xl text-slate-50 my-5 flex  items-center justify-center gap-2">
            {error}
=======
        {verifyError && (
          <h2 className="text-xl text-slate-50 my-5 flex  items-center justify-center gap-2">
            {verifyError}
>>>>>>> 9e1a1bc740c710eccd4f2baec2a76aee4bbe5ffa:src/components/error/ConfirmEmail.tsx
            <FcExpired />
          </h2>
        )}

        <PuffLoader
          color="#FFFFFF"
          loading={loading}
          cssOverride={override}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
<<<<<<< HEAD:src/components/error/ValidatingScreen.tsx
        {!loading && error && (
=======
        {!loading && verifyError && (
>>>>>>> 9e1a1bc740c710eccd4f2baec2a76aee4bbe5ffa:src/components/error/ConfirmEmail.tsx
          <Button
            className="mt-5 mb-5 rounded-lg bg-white p-3 text-xl font-bold text-slate-900 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            mode="idle"
            disabled={false}
            type="button"
            onClick={() => navigate('/')}
          >
            Try again
          </Button>
        )}
        {response?.message
          && (
            <>
              <h1 className="text-2xl text-slate-50 pb-1">{response.message}</h1>
              {response.meta && <h2 className="text-xl text-slate-50 pb-1">{response.meta}</h2> }

              <Button
                className="mt-5 mb-5 rounded-lg bg-white p-3 text-xl font-bold text-slate-900 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                mode="idle"
                disabled={false}
                type="button"
                onClick={() => navigate('/')}
              >
                SHOP NOW
              </Button>
            </>
          )}
      </div>

    </div>
  );
}

export default ValidatingScreen;
