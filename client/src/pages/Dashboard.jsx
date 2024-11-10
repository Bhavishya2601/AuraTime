import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useUser } from '../context/UserContext'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'


const Dashboard = () => {
  const navigate = useNavigate()

  const {userData, setUserData} = useUser() 
  const [loading, setLoading] = useState(true)

  // const handleLogout = async () => {
  //   console.log('logging out')
  //   const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/logout`)
  //   // console.log(response.data)
  //   if (response.status === 200){
  //     // setUserData(null)
  //     console.log('success log out')
  //     toast.success('logged out successfully')
  //     setTimeout(() => {
  //       navigate('/')
  //     }, 1500);
  //   }
  // }

  useEffect(()=>{
    const fetchData = async ()=>{
      setTimeout(() => {
        setLoading(false)
      }, 1000);
    }

    fetchData()
  }, [setUserData])

  return (
    <div>
        <div>
          products will be listed here
        </div>
    </div>
  )
}

export default Dashboard
