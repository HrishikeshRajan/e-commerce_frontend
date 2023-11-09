import React from 'react';

const Signup: React.FC = () => {
  return (
    <div>
      <form role='form'>
        <h2>Sign Up</h2>
        <label htmlFor="fullname">Fullname</label>
        <input type="text" name="fullname" id="fullname" aria-label='fullname' />

        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" aria-label='email'/>

        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" aria-label="password" />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" name="confirmPassword" id="confirmPassword" aria-label="confirm password" />

        <button type="submit">Sign Up</button>
        <div>
          Have an Account? <button>Sign In</button>
        </div>
      </form>

    </div>
  );
};

export default Signup;
