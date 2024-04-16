/* eslint-disable import/no-extraneous-dependencies */
import { useTokenVerify } from '@/hooks/useTokenVerify';
import { CSSProperties } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PuffLoader from 'react-spinners/PuffLoader';
import { MdOutlineMailLock } from 'react-icons/md';
import { FcExpired } from 'react-icons/fc';
import Button from './ui/Button';

function ConfirmEmail() {
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const [response, loading, error] = useTokenVerify(search);

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

        {error.error && (
          <h2 className="text-xl text-slate-50 my-5 flex  items-center justify-center gap-2">
            {error.message}
            {' '}
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
        {!loading && error.error && (
          <Button
            className="mt-5 mb-5 rounded-lg bg-white p-3 text-xl font-bold text-slate-900 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            mode="idle"
            disabled={false}
            type="button"
            onClick={() => navigate('/auth')}
          >
            Try again
          </Button>
        )}
        {!loading && !error.error && response.message
          && (
            <>
              <h1 className="text-2xl text-slate-50 pb-1">{response.message}</h1>
              <h2 className="text-xl text-slate-50 pb-1">{response.meta}</h2>
              <Button
                className="mt-5 mb-5 rounded-lg bg-white p-3 text-xl font-bold text-slate-900 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                mode="idle"
                disabled={false}
                type="button"
                onClick={() => navigate('/auth')}
              >
                SHOP NOW
              </Button>
            </>
          )}
      </div>

    </div>
  );
}

export default ConfirmEmail;
