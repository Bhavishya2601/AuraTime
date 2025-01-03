import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useUser } from '../context/UserContext'
import ForgotLogin from '../components/ForgotLogin'

import { FaGoogle, FaGithub, FaDiscord } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate()

  const { userData, setIsLoggedIn, refreshUser } = useUser()
  useEffect(() => {
    if (Object.entries(userData).length > 0) {
      navigate('/dashboard')
    }
  }, [userData])

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [passwordShown, setPasswordShown] = useState(false)
  const [loading, setLoading] = useState(false)
  const [forgotShown, setForgotShown] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, formData, {
        withCredentials: true
      })

      toast.success('Login Successful')
      setIsLoggedIn(true)
      refreshUser()
      setTimeout(() => {
        navigate('/dashboard')
      }, 2000)
    } catch (err) {
      setLoading(false)
      const errorMessage = err.response?.data?.error || 'Something went Wrong!!'
      toast.error(errorMessage)
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const PasswordVisibility = () => {
    setPasswordShown((prev) => !prev)
  }

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`
  }

  const handleGithubLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/github`
  }

  const handleDiscordLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/discord`
  }

  const handleForgot = () => {
    setForgotShown(true)
  }

  return (
    <div className='relative h-[calc(100vh-72px)]'>
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

      <div className='relative flex flex-col gap-8 lg:flex-row lg:justify-between py-20 lg:py-5 px-5 lg:px-[8%] xl:px-[15%] font-manrope h-full items-center text-white'>


        <div className='w-[250px] xs:w-[300px] lg:w-1/3 flex flex-col justify-center items-center gap-4'>
          <button
            className="flex justify-center items-center bg-transparent border-white border-2 shadow-md w-full lg:w-4/5 px-6 py-2 text-sm font-medium text-white hover:bg-[#f7f7f733]"
            onClick={handleGoogleLogin}>
            <FaGoogle className='text-[24px] mr-2' />
            <span>Continue with Google</span>
          </button>
          <button type="button" className="py-2 px-4 flex justify-center items-center bg-transparent border-2 border-white hover:bg-[#f7f7f733]  text-white w-full lg:w-4/5 transition ease-in duration-300 text-center text-sm font-semibold" onClick={handleGithubLogin}>
            <FaGithub className='text-[24px] mr-2' />
            Continue with GitHub
          </button>
          <button
            className="flex justify-center items-center py-2 text-sm bg-transparent border-2 border-white font-medium text-white hover:bg-[#f7f7f733] w-full lg:w-4/5"
            onClick={handleDiscordLogin}>
            <FaDiscord className='text-[24px] mr-2' />
            <span>Continue with Discord</span>
          </button>
        </div>

        <div className='flex flex-row lg:flex-col items-center gap-2'>
          <div className='lg:h-20 lg:w-[1px] h-[1px] w-20 bg-white'></div>
          <div>OR</div>
          <div className='lg:h-20 lg:w-[1px] h-[1px] w-20 bg-white'></div>
        </div>

        <div className='w-[300px] xs:w-[400px] lg:w-2/5 flex justify-center'>
          <form onSubmit={handleSubmit} className='w-full'>
            <div className='flex flex-col gap-5'>
              <div className='flex flex-col gap-3'>
                <div>
                  <input
                    type="email"
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    className='outline-none px-4 py-2 border-2 border-white bg-transparent w-full'
                    placeholder='Email Address'
                    required />
                </div>
                <div>
                  <input
                    type={passwordShown ? 'text' : 'password'}
                    name='password'
                    value={formData.password}
                    onChange={handleInputChange}
                    className='outline-none px-4 py-2 border-2 border-white bg-transparent w-full'
                    placeholder='Password'
                    required />
                </div>
              </div>
              <div className='flex flex-col gap-1'>
                <div className='items-center flex gap-1'>
                  <input
                    type="checkbox"
                    checked={passwordShown}
                    onChange={PasswordVisibility}
                    id="password-checked"
                    className='h-4 w-4 accent-black checked:ring-1 checked:ring-white'
                  />
                  <label htmlFor="password-checked">Show Password</label>
                </div>
                <div>
                  <input type="submit" className='bg-[#f7f7f733] border-2 border-white text-white w-full py-2 cursor-pointer font-bold hover:bg-[#f7f7f743] duration-300 transition-all tracking-wider' value={loading ? "Logging in..." : "LOGIN"} />
                </div>
                <div className='flex flex-col xs:flex-row justify-between'>
                  <Link to={'/signup'}>New User? <span className=' font-bold'> Create Account</span></Link>
                  <div onClick={handleForgot} className='font-bold cursor-pointer'>Forgot Password</div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      {forgotShown && <ForgotLogin setForgotShown={setForgotShown} /> }
    </div>
  )
}

export default Login
