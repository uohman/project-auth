import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const navigate = useNavigate()

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
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          username: userName, password  // key=password
        })
      })
      const data = await result.json()
      if (data.success) {
        setError("") // no error sign displayed.
        setSuccess('Your account has been created succesfully')
        localStorage.setItem('token', data.response.accessToken) // saving data in the local storage
        setTimeout(() => {
          navigate("/authenticate")
        }, 3000)
      } else {
        setSuccess("")
        setError(data.response)
      }
    } catch (error) {
      setSuccess("")
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
              type="password" 
              name="password" 
              placeholder="Your password" 
              onChange={(event) => setPassword(event.target.value)} 
              value = {password} 
              required />
          <button type="submit" className="button">REGISTER</button>
        </form>
    </div>
  );
}

export default Registration;