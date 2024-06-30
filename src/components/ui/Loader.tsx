/* eslint-disable react/require-default-props */
import { CSSProperties, useEffect, useState } from 'react';
import PuffLoader from 'react-spinners/PuffLoader';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',

};
function getSize() {
  if (window.innerWidth < 480) {
    return 50;
  } if (window.innerWidth < 768) {
    return 60;
  }
  return 120;
}

function Loader({ title, className }:{ title:string, className?:string }) {
  const [size, setSize] = useState(getSize());

  useEffect(() => {
    const handleResize = () => {
      setSize(getSize());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div>
        <PuffLoader size={size} cssOverride={override} color="#cdc5c5" />
      </div>
      <h2 className={` ${className}`}>{title}</h2>

    </>
  );
}

export default Loader;
