import React, { useEffect } from 'react'
import { useUser } from '../context/UserContext'
import axios from 'axios'

const Profile = () => {
  let {userData, isLoading} = useUser()
  let profileData 

  const fetchUserData = async () =>{
    try{
      // console.log(userData)
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/data`, {
        params: {id: userData.id}
      })
      console.log(response.data)
      profileData = response.data
    } catch (err){
      console.log(err)
    }
  }
  useEffect(()=>{
    if (!isLoading && userData){
      fetchUserData()
    }
  }, [isLoading, userData])
  return (
    <div>
      profile
    </div>
  )
}

export default Profile
