import React from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './Login'

const Wrapper = () => {

  const navigate = useNavigate();
  const handleClick = () => navigate('/register');

  return (
    <div className='Outer-wrapper'>
      <div className='Inner-wrapper'>
        <h1>Welcome to the secret page of super-duper secrets</h1>
        <p>Please log in to your account</p>
        <Login />
        <p>Don't have an account?</p><button type="button" class="button" onClick={handleClick}>Register</button>
      </div>
    </div>
  );
}

export default Wrapper;