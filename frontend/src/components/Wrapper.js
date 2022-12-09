import React from 'react';
// import Registration from './Registration'
import Login from './Login'

const Wrapper = () => {
  return (
    <div className='Outer-wrapper'>
      <div className='Inner-wrapper'>
        <h1>Welcome to the secret page of super-duper secrets</h1>
        <p>Please log in to your account</p>
        <Login />
        <p>Don't have an account?</p><a href="http://localhost:3000/register"><p>Register</p></a>
      </div>
    </div>
  );
}

export default Wrapper;