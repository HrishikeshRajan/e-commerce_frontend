/* eslint-disable max-len */

function Desclaimer() {
  const handleClick = () => {
    window.location.replace('https://stripe.com/docs/testing#cards');
  };

  return (
    <div className="border-2x  border-red-200 w-full lg:w-6/12 mx-auto bg-red-100 rounded p-3 ">
      <h2 className="font-bold text-slate-700 py-2">Disclaimer:</h2>
      <p className=" font-semibold text-slate-600 content-center  ">
        Please be advised that this is a demonstration project and does not facilitate real financial transactions.
        Kindly refrain from entering genuine credit card numbers or any sensitive financial information.
        Any data entered into this system is solely for testing purposes and will not be processed for actual payments.
        It is important to note that all financial transactions are securely handled by Stripe, and Wondercart does
        not collect any financial information directly.
        For testing purposes, please utilize test card numbers such as 4242 4242 4242 4242 or similar.
        Thank you for your cooperation.

        For more details visit
        {' '}
        <button type="button" className="text-blue-500" onClick={handleClick}>Stripe</button>

      </p>
    </div>
  );
}

export default Desclaimer;
