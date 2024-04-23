import { CSSProperties } from 'react';
import PuffLoader from 'react-spinners/PuffLoader';

function PageWaiting({ loading }:{ loading:boolean }) {
  const override: CSSProperties = {
    display: 'flex',
    margin: '0 auto',
    borderColor: 'red',
  };
  return (
    <div className="w-screen flex flex-col justify-center items-center h-screen bg-cyan-400">

      <PuffLoader
        color="white"
        loading={loading}
        cssOverride={override}
        aria-label="Loading Spinner"
        size={100}
        data-testid="loader"
      />
      <h1 className="text-white font-bold p-2">Please wait ...</h1>
    </div>
  );
}

export default PageWaiting;
