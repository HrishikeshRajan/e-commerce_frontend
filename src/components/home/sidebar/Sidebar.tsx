import React, { useState } from 'react';

function Sidebar() {
  const [filter, setFilter] = useState<boolean>(false);
  return (
    <>
      <div className={`absolute transition   ${filter ? '-translate-x-96' : 'translate-x-0'} lg:translate-x-0 z-10 lg:fixed shadow-lg h-screen w-9/12 lg:w-2/12 bg-red-400  left-0 `}>Sidebar</div>
      <button type="button" className="lg:hidden text-black mt-20 absolute z-10" onClick={() => setFilter(!filter)}>Click</button>
    </>
  );
}

export default Sidebar;
