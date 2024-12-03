import React, { useEffect, useState, useRef } from 'react'
import { useUser } from '../context/UserContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Footer from '../components/Footer'

import { GoPencil } from "react-icons/go";

const Profile = ({ updateHeaderUser }) => {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  let { userData, setUserData, isLoading } = useUser()
  const [profileData, setProfileData] = useState(null)
  const [passData, setPassData] = useState({
    current: '',
    new: '',
    retype: ''
  })
  const [isUploading, SetIsUploading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  const [lastWarn, setLastWarn] = useState(false)
  const [isChanging, setIsChanging] = useState(false)

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/profile/data`, {
        params: { id: userData.id }
      })
      setProfileData(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (!isLoading && Object.entries(userData).length === 0) {
      navigate('/')
    }
    if (!isLoading && userData) {
      fetchUserData()
    }
  }, [isLoading, userData])

  const handleChange = (e) => {
    setPassData({
      ...passData,
      [e.target.name]: e.target.value
    })
  }

  const handleImageChange = () => {
    fileInputRef.current.click()
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append('image', file)

    for (const key in profileData) {
      formData.append(key, profileData[key]);
    }
    SetIsUploading(true)

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/profile/imgUpload`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )
      if (response.status === 200) {
        toast.success('Profile Image Updated Successfully')
        setProfileData({ ...profileData, profile_image_url: response.data.url })
      }
    } catch (err) {
      console.log(err.message)
      toast.error('Something Went Wrong')
    } finally {
      SetIsUploading(false)
      fetchUserData()
    }
  }

  const handleEdit = async (e) => {
    e.preventDefault()
    setIsChanging(false)
    if (passData.new !== passData.retype) {
      toast.error('Retyped password doesn\'t match.')
      return
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/profile/edit`, {
        data: profileData,
        pass: passData
      })
      if (response.status === 200) {
        setPassData({
          current: '',
          new: '',
          retype: ''
        })
        toast.success('Password changed Successfully')
      }
    } catch (err) {
      toast.error(err.response?.data?.error || 'Something Went Wrong')
    } finally{
      isChanging(false)
    }
  }

  const handleDelete = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/profile/delete`, {
        data: profileData
      })
      if (response.status === 200) {
        toast.success('Account Deleted Successfully')
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/logout`, {}, {
          withCredentials: true
        })
        updateHeaderUser(false)
        setUserData({})
      }
    } catch (err) {
      console.log(err.message)
      toast.error('Something Went Wrong')
    }
  }

  return (
    <div>
      {profileData ?
        <div className='min-h-[600px] flex flex-col md:flex-row gap-5 md:gap-20 lg:gap-40 font-cinzel py-20 px-2 xxs:px-10 lg:px-20 xl:px-48 bg-[#f8f8f8]'>
          <div className='flex flex-col gap-8'>
            <div className='flex flex-col items-center gap-3'>
              <div className='rounded-full'>
                <div className='relative w-40 h-40 rounded-full overflow-hidden group cursor-pointer' onClick={handleImageChange}>
                  <img
                    src={profileData.profile_image_url || `img/user.png`}
                    alt="profile photo"
                    className='w-full h-full rounded-full'
                  />
                  {isUploading &&
                    <div className='absolute inset-0 bg-white z-20 flex justify-center items-center'>
                      <img src="img/loader.gif" alt="loader" className='h-16' />
                    </div>}
                  <div className='absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300'></div>
                  <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <GoPencil className='text-xl text-white' />
                  </div>
                </div>
                <input type="file"
                  className='hidden'
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                />
              </div>
              <div className='flex flex-col'>
                <div className='text-2xl font-bold'>{profileData.firstname} {profileData.lastname}</div>
                <div className='font-manrope'>{profileData.email}</div>
              </div>
            </div>
            <div className='flex flex-col gap-3 text-lg'>
              <div className={`cursor-pointer ${activeTab === 'profile' ? 'font-bold' : ""}`} onClick={() => setActiveTab('profile')}>Profile</div>
              <div className={`cursor-pointer ${activeTab === 'orders' ? 'font-bold' : ""}`} onClick={() => setActiveTab('orders')}>My Orders</div>
              <div className={`cursor-pointer ${activeTab === 'settings' ? 'font-bold' : ""}`} onClick={() => setActiveTab('settings')}>Settings</div>
            </div>
          </div>
          <div className='font-semibold flex justify-center '>
            {activeTab === 'profile' && (
              <div className='flex flex-col gap-3 xs:text-xl xl:text-2xl py-5 lg:p-10 xl:p-16'>
                <div className='flex gap-5 items-center py-1'>
                  <div>First Name</div>
                  <div className='font-manrope'>{profileData.firstname}</div>
                </div>
                <div className='flex gap-5 items-center py-1'>
                  <div>Last Name</div>
                  <div className='font-manrope'>{profileData.lastname}</div>
                </div>
                <div className='flex gap-5 items-center py-1'>
                  <div>Email</div>
                  <div className='font-manrope w-full break-all overflow-hidden text-ellipsis'>{profileData.email}</div>
                </div>
                <div className='flex gap-5 items-center py-1'>
                  <div>City</div>
                  <div className='font-manrope text-[#6B7280]'>----</div>
                </div>
                <div className='flex gap-5 items-center py-1'>
                  <div>State</div>
                  <div className='font-manrope text-[#6B7280]'>----</div>
                </div>
              </div>
            )} {activeTab === 'orders' && (
              <div className='text-2xl p-20'>No Orders yet</div>
            )} {activeTab === 'settings' && (
              <div className='flex flex-col  gap-10 w-full xs:w-4/5 md:w-[50vw] px-5 xs:px-10 lg:px-20 py-8'>
                <form onSubmit={handleEdit} className='flex flex-col gap-3 font-manrope'>
                  <div className='text-2xl font-cinzel'>Change Password</div>
                  <input
                    type={`${showPass ? "text" : "password"}`}
                    className='py-2 px-3 w-full lg:w-4/5 xl:w-3/5 outline-none rounded-lg border-2 focus:border-black bg-[#f8f8f8] transition-all duration-700'
                    placeholder='Current Password'
                    name='current'
                    value={passData.current}
                    onChange={handleChange}
                    required />
                  <input
                    type={`${showPass ? "text" : "password"}`}
                    className='py-2 px-3 w-full lg:w-4/5 xl:w-3/5 outline-none rounded-lg border-2 focus:border-black bg-[#f8f8f8] transition-all duration-700'
                    placeholder='New Password'
                    name='new'
                    value={passData.new}
                    onChange={handleChange}
                    required />
                  <input
                    type={`${showPass ? "text" : "password"}`}
                    className='py-2 px-3 w-full lg:w-4/5 xl:w-3/5 outline-none rounded-lg border-2 focus:border-black bg-[#f8f8f8] transition-all duration-700'
                    placeholder='Retype Password'
                    name='retype'
                    value={passData.retype}
                    onChange={handleChange}
                    required />
                  <div className='flex gap-2 items-center'>
                    <input
                      type="checkbox"
                      className='h-4 w-4 accent-black checked:ring-1 checked:ring-white'
                      onChange={() => setShowPass(prev => !prev)} />
                    <div>Show Password</div>
                  </div>
                  <input type="submit" className='bg-black text-white px-4 py-2 rounded-lg w-full lg:w-4/5 xl:w-3/5 cursor-pointer hover:bg-slate-800 transition-all duration-300' value="Change Password" disabled={isChanging} />
                </form>
                <div className='flex flex-col gap-3'>
                  <div className='text-2xl font-cinzel'>DELETE ACCOUNT</div>
                  <button onClick={() => setLastWarn(true)} className='w-full lg:w-4/5 xl:w-3/5 bg-red-600 text-white rounded-lg font-manrope py-2 hover:bg-red-500 transition-all duration-30'>Delete Account</button>
                </div>
              </div>
            )}
          </div>
          {lastWarn && (
            <div className=' fixed top-0 left-0 w-full h-full z-1 font-manrope' style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', transition: 'opacity 0.5s ease, visibility 0.5s ease' }}>
              <div className='bg-[#f8f8f8] mx-auto my-[15%] p-5 border-1 w-[400px] text-center flex flex-col gap-3 rounded-xl'>
                <div className='font-semibold text-2xl font-cinzel'>Delete Account</div>

                <div className='flex flex-col '>
                  <div>Are you Sure you want Delete your Account?</div>
                  <div>This process is <span className='text-red-500 font-bold'>Irreversible</span></div>
                  <div className='flex gap-2 my-2'>
                    <button onClick={handleDelete} className='bg-red-600 text-white font-bold w-1/2 rounded-lg py-2 hover:bg-red-500 transition-all duration-300'>Delete</button>
                    <button onClick={() => setLastWarn(false)} className='w-1/2 bg-black text-white rounded-lg font-bold hover:bg-slate-800 transition-all duration-300'>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        : <div className='h-[80vh] flex justify-center items-center'>
          <img src="img/loader.gif" alt="loader" className='h-20' />
        </div>
      }
      <Footer />
    </div>
  )
}

export default Profile



