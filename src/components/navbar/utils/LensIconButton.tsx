/* eslint-disable react/require-default-props */
import { useMemo } from 'react';
import { IconContext } from 'react-icons';
import { CiSearch } from 'react-icons/ci';

type LensIconButtonProps = {
  enableSearch?: () => void
};
function LensIconButton({ enableSearch }:LensIconButtonProps) {
  const styles = useMemo(() => ({ className: 'text-slate-700 ', size: '20' }), []);
  return (
    <button type="button" aria-label="search" onClick={enableSearch} className="flex items-center">
      <IconContext.Provider value={styles}>
        <span>
          <CiSearch />
        </span>
      </IconContext.Provider>
    </button>
  );
}

export default LensIconButton;
