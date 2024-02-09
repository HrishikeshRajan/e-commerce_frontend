import React from 'react';

function Desclaimer() {
  return (
    <div className="border-2 border-red-200 w-full lg:w-6/12 mx-auto bg-red-100 rounded p-3 ">
      <h2 className="font-bold text-slate-700 py-2">Disclaimer:</h2>
      <p className=" font-semibold text-slate-600 content-center  ">
        Please refrain from entering any actual
        <strong> card </strong>
        numbers or sensitive financial information.
        This is a demo project created for educational or illustrative purposes only.
        Any information entered or submitted here may be visible to others and is not secure.
        <br />
        Use a sample test card like 4242 4242 4242 4242
      </p>
    </div>
  );
}

export default Desclaimer;
