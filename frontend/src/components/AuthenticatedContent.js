import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthenticatedContent = () => {
  const navigate = useNavigate()

  const [answer, setAnswer] = useState("")
  const [checkInProgress, setCheckInProgress] = useState(true)

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token")   //
      // console.log(token)
      if (token) { // if token found
        setCheckInProgress(false)
        try {
          const result = await fetch("https://project-auth-2-fls35onjaq-lz.a.run.app/authenticate", { //fetching username and password
            method: "GET",
            headers: {
              "Content-type": "application/json", 
              "Authorization": token    //authentication through token, validity
            }
          })
          const data = await result.json()
          if(data.success) {
            setAnswer(data.response)
          }
        } catch (error) {
          console.log(error)
        }
      } else {
        navigate("/login")
      }
    }) () // executing right await
  }, [])

  const logOut = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }


  if (checkInProgress) {
    return <div>Loading...</div>
  }
  return (
    <>
    <div className="Auth-wrapper">
    <div className='Authentication'>Hello {answer} 
    <button className="Logout-button" onClick={logOut}>LOG OUT</button>
    <lottie-player
          src="https://assets8.lottiefiles.com/packages/lf20_1frvu8qg.json"
          alt="greeting"
          speed="1"
          autoplay
          width="40px"
          height="40px">
    </lottie-player>
    </div>
    </div>
 
    </>
  )
  }

export default AuthenticatedContent