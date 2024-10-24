import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Dashboard = () => {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token')


      if (token) {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/dashboard`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          setUserData(response.data)
        } catch (err) {
          console.log('Error fetching Dashboard data')
          console.log(err)
        }
      } else {
        console.log('No token found')
      }
    }

    fetchData()
  }, [])


  return (
    <div>
      {userData? (
        <div>
          <h1>Welcome, {userData.user.email}</h1>
        </div>
      ): (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default Dashboard
