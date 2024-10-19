import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'


const SignUp = () => {
  const [passwordShown, setPasswordShown] = useState(false)
  const [verifyOTP, setVerifyOTP] = useState(false)
  const [otp, setOtp] = useState('')
  const [countdown, setCountdown] = useState(30)
  const [isDisabled, setIsDisabled] = useState(true)

  const [formData, setFormData] = useState({
    fName: '',
    lName: '',
    email: '',
    password: ''
  })

  const navigate = useNavigate()

  const PasswordVisibility = (e) => {
    setPasswordShown((prev) => !prev)
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    let timer;
    if (verifyOTP && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer)
            setIsDisabled(false) 
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => clearInterval(timer)
  }, [verifyOTP, countdown])

  const handleOtpChange = (e) => {
    setOtp(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signup`, { email: formData.email, fName: formData.fName, lName: formData.lName })
      console.log(response.status)
      if (response.data.success || response.status == 201) {

        setVerifyOTP(true); // pop up to verify otp
        toast.success('Check your Mail for OTP')

      } else {
        toast.error('Something Went Wrong!!')
      }
    } catch (err) {
      toast.error('Something Went Wrong!!')
      console.log(err.message)
    }
  }

  const handleOtpSubmit = async (e) => {
    e.preventDefault()

    const result = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/verify_otp`, { ...formData, otp })
    if (result.data.success || result.status == 201) {
      // set cookies over here
      toast.success('Account Created')
      setTimeout(() => {
        navigate('/dashboard')
      }, 2000)
    } else {
      toast.error('Something Went Wrong!!')
    }
  }

  const resendOTP = () => {
    // resend otp implement karna hai
    isDisabled(true)
    setCountdown(30)
    toast.success('OTP send Successfully')
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Toaster />
        <div className='flex flex-col justify-center mx-60 gap-3 items-center py-10 font-manrope'>
          <div className="text-2xl font-bold uppercase">Create New Account</div>
          <div className='w-1/2'>
            <label className='flex flex-col gap-1'>
              First Name
              <input
                type="text"
                name="fName"
                onChange={handleInputChange}
                value={formData.fName}
                className='outline-none px-4 py-2 rounded-lg border-2'
                required />
            </label>
          </div>
          <div className='w-1/2'>
            <label className='flex flex-col gap-1'>
              Last Name
              <input
                type="text"
                name='lName'
                value={formData.lName}
                onChange={handleInputChange}
                className='outline-none px-4 py-2 rounded-lg border-2'
                required />
            </label>
          </div>
          <div className='w-1/2'>
            <label className='flex flex-col gap-1'>
              Email Address
              <input
                type="email"
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                className='outline-none px-4 py-2 rounded-lg border-2'
                required />
            </label>
          </div>
          <div className='w-1/2'>
            <label className='flex flex-col gap-1'>
              Password
              <input
                type={passwordShown ? 'text' : 'password'}
                name='password'
                value={formData.password}
                onChange={handleInputChange}
                className='outline-none px-4 py-2 rounded-lg border-2'
                required />
            </label>
          </div>
          <div className='flex flex-col w-full items-center'>


            <div className='w-1/2'>
              <div className='flex gap-2 items-center'>
                <input
                  type="checkbox"
                  checked={passwordShown}
                  onChange={PasswordVisibility}
                  id="password-checked"
                  className='w-4 h-4'
                />
                <label htmlFor="password-checked">Show Password</label>
              </div>
            </div>
            <div className='w-1/2 py-2'>
              <input type="submit" className='bg-blue-700 text-white w-full py-2 rounded-lg cursor-pointer hover:bg-blue-600' />
            </div>
            <div>
              Already have a Account?<Link to={'/login'} className='text-blue-600 font-semibold'> Login</Link>
            </div>
          </div>
        </div>
      </form>

      {/* code for pop up */}
      <div id="popup" className={`${verifyOTP ? '' : 'hidden'} fixed top-0 left-0 w-full h-full z-1 font-manrope`} style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', transition: 'opacity 0.5s ease, visibility 0.5s ease' }}>
        <div className='bg-white mx-auto my-[15%] p-5 border-1 w-[300px] text-center rounded-lg'>
          <div className='font-semibold text-xl'>Verify OTP</div>
          <form onSubmit={handleOtpSubmit} className='flex flex-col mt  -3 gap-2'>
            <input type="text" name="otp" value={otp} onChange={handleOtpChange} className='border-2 rounded-lg py-1 px-2' placeholder='Enter OTP' />
            <input type="submit" className='bg-blue-700 text-white rounded-lg py-1 cursor-pointer hover:bg-blue-600' />
          </form>
          <div className='w-full'>
            <button 
            disabled={isDisabled} 
            className={`text-left text-[14px] ${isDisabled ? 'text-gray-400 cursor-not-allowed' : 'text-black cursor-pointer'}`}
            onClick={resendOTP}
            >Resend OTP {isDisabled && `(${countdown}s)`}</button>
          </div>
        </div>
      </div>

    </>
  )
}

export default SignUp
