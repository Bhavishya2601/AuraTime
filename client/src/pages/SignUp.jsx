import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'


const SignUp = () => {
  const [passwordShown, setPasswordShown] = useState(false)
  const [verifyOTP, setVerifyOTP] = useState(false)
  const [otp, setOtp] = useState('')

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
  
  const handleOtpChange = (e) =>{
    setOtp(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signup`, {email : formData.email})
      console.log(response.status)
      if (response.data.success || response.status == 201) {
        
        setVerifyOTP(true); // pop up to verify otp
        toast.success('Check Your Email')
      } else{
        toast.error('Something Went Wrong!!')
      }
    } catch (err) {
      toast.error('Something Went Wrong!!')
      console.log(err.message)
    }
  }
  
  const handleOtpSubmit = async (e) =>{
    e.preventDefault()
    
    const result = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/verify_otp`, {...formData, otp})
    if (result.data.success || result.status == 201){
      // set cookies over here
      toast.success('Account Created')
      setTimeout(()=>{
        navigate('/dashboard')
      }, 2000)
    } else {
      toast.error('Something Went Wrong!!')
    }
  }


  return (
    <>
      <form onSubmit={handleSubmit}>
        <Toaster />
        <div className='flex flex-col justify-center mx-auto gap-3 items-center py-10'>
          <div className="text-xl font-bold uppercase">Create New Account</div>
          <div className='w-1/3'>
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
          <div className='w-1/3'>
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
          <div className='w-1/3'>
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
          <div className='w-1/3'>
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
          <div>
            <input
              type="checkbox"
              checked={passwordShown}
              onChange={PasswordVisibility}
              id="password-checked"
            />
            <label htmlFor="password-checked">Show Password</label>
          </div>
          <div className='w-1/3 py-2'>
            <input type="submit" className='bg-blue-400 w-full py-1 rounded-lg' />
          </div>
          <div>
            <Link to={'/login'}>Already have a Account?</Link>
          </div>
        </div>
      </form>

      {/* code for pop up */}
      <div id="popup" className={`${verifyOTP ? '' : 'hidden'} fixed top-0 left-0 w-full h-full z-1`} style={{backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>
        <div className='bg-white mx-auto my-[15%] p-5 border-1 w-[300px] text-center'>
          <h2>Verify OTP</h2>
          <form onSubmit={handleOtpSubmit}>
            <input type="text" name="otp" className='border-1' value={otp} onChange={handleOtpChange}/>
            <input type="submit" />
          </form>
        </div>
      </div>

    </>
  )
}

export default SignUp
