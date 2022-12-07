import React, { useState } from 'react';

const Registration = () => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState ('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const submit = async (event) => { 
    event.preventDefault()   

    if (!userName || !password) {
      setError("Username and password is required")
      return  // code break => no continuation.
    }
    setError('') 

    try {
      const result = await fetch("http://localhost:8080/register", { //fetching username and password
        method: "POST",
        body: JSON.stringify({
          userName, password 
        })
      })
      const data = result.json()
      if (data.success) {
        setSuccess('Your account has been created succesfully')
        localStorage.setItem('token', data.accessToken) // saving data in the local storage
      } else {
        setError("Error could not register")
      }
    } catch (error) {
      console.log(error)
      setError("Sorry an error occured")
    }
  }
 
  return (
    <div>
      { error && 
      <strong className='error-msg'>
        {error}
      </strong>
      }
      { success && 
      <strong className='success-msg'>
        {success}
      </strong>
      }
          <form onSubmit={submit}>
            <input 
              type="text" 
              name="username" 
              placeholder="Your username" 
              onChange={(event) => setUserName(event.target.value)} 
              value = {userName} 
              required />
            <input 
              type="text" 
              name="password" 
              placeholder="Your password" 
              onChange={(e) => setPassword(e.target.value)} 
              value = {password} 
              required />
          <button type="submit" className="button">REGISTER</button>
        </form>
    </div>
  );
}

export default Registration;