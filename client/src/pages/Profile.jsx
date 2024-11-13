import React, { useEffect, useState } from 'react'
import { useUser } from '../context/UserContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import Footer from '../components/Footer'

const Profile = () => {
  const navigate = useNavigate()
  let { userData, isLoading } = useUser()
  const [profileData, setProfileData] = useState(null)

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/data`, {
        params: { id: userData.id }
      })
      setProfileData(response.data)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    // console.log(userData, isLoading)
    if (!isLoading && Object.entries(userData).length === 0){
      alert('redirect to login')
      // navigate('/login')
    }
    if (!isLoading && userData) {
      fetchUserData()
    }
  }, [isLoading, userData])

  return (
    <div>
      {profileData ?
        <div className='h-[70vh] flex flex-col gap- justify-center items-center font-manrope'>
          <div className='rounded-full'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThRGcLNaorK4esT7jd4P_MfhhrzowqyTHRqA8Ku2vZW7KNrswJYoA0CcmhlTTPsWSQZ5I&usqp=CAU" alt="" className='rounded-full h-40' />
          </div>
          <div className='flex gap-5 text-lg'>
            <div className=''>
              <div>First Name : </div>
              <div>Last Name : </div>
              <div>Email : </div>
            </div>
            <div className=''>
              <div>{profileData.firstname}</div>
              <div>{profileData.lastname}</div>
              <div>{profileData.email}</div>
            </div>
          </div>
        </div>
        // delete account 
        // add products max 5
        // change password
        : <div className='h-[70vh] flex justify-center items-center'>
          <img src="img/loader.gif" alt="loader" className='h-20' />
        </div>
}
      <Footer />
    </div>
  )
}

export default Profile



