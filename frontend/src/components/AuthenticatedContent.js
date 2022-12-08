import React, { useEffect } from 'react'

const AuthenticatedContent = () => {
  const [answer, setAnswer] = useState("")
   
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token")
      if (token) { // if token found
        try {
          const result = await fetch("http://localhost:8080/authentication", { //fetching username and password
            method: "GET",
            headers: {
              "Content-type": "application/json"
            }
          })
          const data = result.json()
          if(data.success) {
            setAnswer("")
          }
        } catch (error) {
          console.log(error)
        }
      }
    }) () // executing right await
  }, [])
  
  return (
    <div>Hello {answer}</div>
  )
  }

export default AuthenticatedContent