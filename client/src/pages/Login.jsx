import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import google from '../assets/google.svg'
import github from '../assets/github.svg'
import discord from '../assets/discord.svg'

const Login = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [passwordShown, setPasswordShown] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/login`, formData)

      toast.success('logged in')
      setTimeout(() => {
        navigate('/dashboard')
      }, 2000)
    } catch (err) {
      toast.error('Something Went Wrong!!')
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const PasswordVisibility = () => {
    // implement password visiblity
  }

  return (
    <>
      <div className='flex justify-around my-20 mx-80 py-5 border-2 rounded-3xl font-manrope'>
        <div className='w-1/3 flex flex-col justify-center items-end gap-4'>
          <button
            className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md w-4/5 px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200">
            <img src={google} alt="google" className="h-6 w-6 mr-2" />
            <span>Continue with Google</span>
          </button>
          <button type="button" className="py-2 px-4 flex justify-center items-center bg-gray-600 hover:bg-gray-700  text-white w-4/5 transition ease-in duration-200 text-center text-sm font-semibold shadow-md rounded-lg">
            <img src={github} alt="github" className="h-6 w-6 mr-2" />
            Sign in with GitHub
          </button>
          <button
            className="flex items-center border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-white hover:bg-gray-200 w-4/5"
            style={{ backgroundColor: '#5865F2' }}>
            <img src={discord} alt="discord" className="h-6 w-6 mr-2" />
            <span>Continue with Discord</span>
          </button>
        </div>

        <div className='border-[1px] h-60 mt-12 border-slate-400' />

        <div className='w-2/5'>
          <form onSubmit={handleSubmit}>
            <Toaster />
            <div className='flex flex-col mx-auto gap-3 py-10'>

              <div>
                <label className='flex flex-col gap-1'>
                  Email Address
                  <input
                    type="email"
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    className='outline-none px-4 py-2 rounded-lg border-2 w-4/5'
                    required />
                </label>
              </div>
              <div>
                <label className='flex flex-col gap-1'>
                  Password
                  <input
                    type={passwordShown ? 'text' : 'password'}
                    name='password'
                    value={formData.password}
                    onChange={handleInputChange}
                    className='outline-none px-4 py-2 rounded-lg border-2 w-4/5'
                    required />
                </label>
              </div>
              <div className='flex flex-col gap-1'>
                <div className='items-center flex gap-1'>
                  <input
                    type="checkbox"
                    checked={passwordShown}
                    onChange={PasswordVisibility}
                    id="password-checked"
                    className='h-4 w-4'
                  />
                  <label htmlFor="password-checked">Show Password</label>
                </div>
                <div>
                  <input type="submit" className='bg-blue-700 text-white w-4/5 py-2 rounded-lg' />
                </div>
                <div>
                  <Link to={'/signup'}>New User? <span className='text-blue-600 font-semibold'> Create Account</span></Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
