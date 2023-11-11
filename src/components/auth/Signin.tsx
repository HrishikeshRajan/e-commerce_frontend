import React from 'react';

const Signin: React.FC = () => {
  return (
    <div>
      <form role='form'>
        <h2>Sign In</h2>
   
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" aria-label='email'/>

        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" aria-label="password" />

        <button type="submit">Sign in</button>
       
      </form>

    </div>
  );
};

export default Signin;
