import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {
  const [passwordShown, setPasswordShown] = useState(false)

  const [formData, setFormData] = useState({
    fName: '',
    lName: '',
    email: '',
    password: ''
  })

  const handleInputChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    try{
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signup`, formData)
      // after submittion things are pending
    } catch (err){
      console.log(err.message)
    }
  }

  const PasswordVisibility = (e) =>{
    setPasswordShown((prev) => !prev)
  }


  return (
    <>
    <form onSubmit={handleSubmit}>
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
            required/>
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
          <input type="submit" className='bg-blue-400 w-full py-1 rounded-lg'/>
        </div>
      <div>
        <Link to={'/login'}>Already have a Account?</Link>
      </div>
      </div>
      </form>
    </>
  )
}

export default SignUp
