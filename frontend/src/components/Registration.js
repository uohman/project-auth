import React from 'react';

const Registration = () => {
  return (
    <div>
          <form action="">
          <input type="text" name="username" placeholder="Your username" required />
          <input type="text" name="password" placeholder="Your password" required />
          <button type="submit" className="button">REGISTER</button>
        </form>
    </div>
  );
}

export default Registration;