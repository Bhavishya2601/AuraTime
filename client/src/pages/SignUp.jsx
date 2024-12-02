import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { useUser } from '../context/UserContext'
import { RxCross1 } from "react-icons/rx";


const SignUp = () => {
  const [passwordShown, setPasswordShown] = useState(false)
  const [verifyOTP, setVerifyOTP] = useState(false)
  const [otp, setOtp] = useState('')
  const [countdown, setCountdown] = useState(30)
  const [isDisabled, setIsDisabled] = useState(true)
  const [handleSignupClick, setHandleSignupClick] = useState(false)
  const { refreshUser } = useUser()
  const [otpSubmit, setOtpSubmit] = useState(false)

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
    setHandleSignupClick(true)
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signup`, { email: formData.email, fName: formData.fName, lName: formData.lName })
      if (response.data.success || response.status == 201) {

        setVerifyOTP(true); // pop up to verify otp
        toast.success('Check your Mail for OTP')

      } else {
        toast.error('Something Went Wrong!!')
      }
    } catch (err) {
      toast.error('Something Went Wrong!!', err.message)
    } finally {
      setHandleSignupClick(false)
    }
  }

  const handleOtpSubmit = async (e) => {
    e.preventDefault()
    setOtpSubmit(true)
    try {

      const result = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/verify_otp`, { ...formData, otp }, {
        withCredentials: true
      })
      if (result.data.success || result.status == 201) {
        toast.success('Account Created')
        refreshUser()
        setTimeout(() => {
          navigate('/dashboard')
        }, 2000)
      }
    } catch (err) {
      toast.error('Something Went Wrong!!')
      setVerifyOTP(false)
      setHandleSignupClick(false)
      setFormData({
        ...formData,
        password: ''
      })
      setOtp('')
    } finally {
      otpSubmit(false)
    }
  }

  const resendOTP = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/resend-otp`, { email: formData.email, fName: formData.fName, lName: formData.lName })
      if (response.status === 200) {
        setIsDisabled(true)
        setCountdown(30)
        toast.success('OTP send Successfully')
      } else {
        toast.error('Something went wrong')
        setTimeout(() => {
          navigate('/login')
        }, 200);
      }
    } catch (err) {
      console.log('error fetching ', err.message)
    }
  }

  const handleClosePop = () => {
    setVerifyOTP(false)
    setHandleSignupClick(false)
    setFormData({
      ...formData, password: ''
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='relative h-[calc(100vh-72px)]'>
        <video
          poster='img/bg9.jpg'
          src="img/bg-video.mp4"
          className='absolute h-full w-full object-cover filter'
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>

        <div className='relative flex flex-col justify-center px-5 xxs:px-10 sm:px-20 lg:px-60 gap-8 items-center py-10 font-manrope text-white h-full'>
          <div className="text-3xl xs:text-4xl font-bold uppercase">Create New Account</div>

          <div className='flex flex-col gap-4 w-full items-center'>
            <div className='w-full sm:w-3/5 lg:w-2/3 xl:w-1/2'>
              <input
                type="text"
                name="fName"
                onChange={handleInputChange}
                value={formData.fName}
                className='outline-none px-4 py-2 border-2 w-full bg-transparent'
                placeholder='First Name'
                required />
            </div>
            <div className='w-full sm:w-3/5 lg:w-2/3 xl:w-1/2'>
              <input
                type="text"
                name='lName'
                value={formData.lName}
                onChange={handleInputChange}
                className='outline-none px-4 py-2 border-2 w-full bg-transparent'
                placeholder='Last Name'
                required />
            </div>
            <div className='w-full sm:w-3/5 lg:w-2/3 xl:w-1/2'>
              <input
                type="email"
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                className='outline-none px-4 py-2 border-2 w-full bg-transparent'
                placeholder='Email Address'
                required />
            </div>
            <div className='w-full sm:w-3/5 lg:w-2/3 xl:w-1/2'>
              <input
                type={passwordShown ? 'text' : 'password'}
                name='password'
                value={formData.password}
                onChange={handleInputChange}
                className='outline-none px-4 py-2 border-2 w-full bg-transparent'
                placeholder='Password'
                required />
            </div>
          </div>
          <div className='flex flex-col w-full items-center'>
            <div className='w-full sm:w-3/5 lg:w-2/3 xl:w-1/2'>
              <div className='flex gap-2 items-center'>
                <input
                  type="checkbox"
                  checked={passwordShown}
                  onChange={PasswordVisibility}
                  id="password-checked"
                  className='w-4 h-4 accent-black checked:ring-1 checked:ring-white'
                />
                <label htmlFor="password-checked">Show Password</label>
              </div>
            </div>
            <div className='w-full sm:w-3/5 lg:w-2/3 xl:w-1/2 py-2'>
              <input type="submit" className='bg-[#f7f7f733] text-white w-full py-2 border-2 border-white cursor-pointer hover:bg-[#f7f7f743] duration-300 transition-all tracking-wider' disabled={handleSignupClick} value={handleSignupClick ? "Submitting..." : "Submit"} />
            </div>
            <div>
              Already have a Account?<Link to={'/login'} className=' font-bold'> Login</Link>
            </div>
          </div>
        </div>
      </form>

      {/* code for pop up */}
      <div id="popup" className={`${verifyOTP ? '' : 'hidden'} fixed top-0 left-0 w-full h-full z-1 font-manrope`} style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', transition: 'opacity 0.5s ease, visibility 0.5s ease' }}>
        <div className='relative bg-transparent border-2 border-white text-white mx-auto my-[15%] p-5 border-1 w-[300px] text-center flex flex-col gap-4'>
          <RxCross1 className='absolute text-white text-xl top-1 right-1 cursor-pointer' onClick={handleClosePop} />
          <div className='font-semibold text-xl'>Verify OTP</div>
          <form onSubmit={handleOtpSubmit} className='flex flex-col gap-2'>
            <input type="text" name="otp" value={otp} onChange={handleOtpChange} className='border-2 bg-transparent py-1 px-2' placeholder='Enter OTP' />
            <input type="submit" className={`bg-[#f7f7f733] border-2 border-white text-white py-1 cursor-pointer hover:bg-[#f7f7f743] duration-300 transition-all tracking-wider ${otpSubmit ? 'cursor-not-allowed' : ''}`} disabled={otpSubmit} value={otpSubmit ? "Submitting..." : "Submit"} />
          </form>
          <div className='w-full'>
            <button
              disabled={isDisabled}
              className={`text-left text-[14px] ${isDisabled ? 'text-white cursor-not-allowed' : 'text-slate-300 cursor-pointer'}`}
              onClick={resendOTP}
            >Resend OTP {isDisabled && `(${countdown}s)`}</button>
          </div>
        </div>
      </div>

    </>
  )
}

export default SignUp
