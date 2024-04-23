function ReCaptchaInfo() {
  return (
    <div className="flex flex-col">
      <p className="text-slate-400   text-xs">This site is protected by reCAPTCHA and the Google</p>
      <div className="flex">
        <a href="https://policies.google.com/privacy" className="text-blue-500 text-xs">Privacy Policy </a>
        <span className="text-slate-400 text-xs">&nbsp;and</span>
        <a href="https://policies.google.com/terms" className="text-blue-500 text-xs"> &nbsp; Terms of Service</a>
        <span className="text-slate-400 text-xs">&nbsp;apply.</span>
      </div>
    </div>
  );
}

export default ReCaptchaInfo;
