import { CSSProperties } from 'react';
import PuffLoader from 'react-spinners/PuffLoader';

function PageWaiting({ loading }:{ loading:boolean }) {
  const override: CSSProperties = {
    display: 'block',
    margin: '0 auto',
    borderColor: 'red',
  };
  return (
    <div className="w-screen h-screen bg-cyan-500">
      <PuffLoader
        color="#FFFFFF"
        loading={loading}
        cssOverride={override}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default PageWaiting;
