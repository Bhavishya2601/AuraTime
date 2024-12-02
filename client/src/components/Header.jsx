import React, { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast'

import { useUser } from '../context/UserContext'

import { FaUser } from "react-icons/fa";
import { FaCartShopping, FaBars } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

const Header = ({ toggleCart, userExistHeader: userExist, updateHeaderUser: setUserExist }) => {
  const [dropdown, setDropdown] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { userData, setUserData, isLoading } = useUser()
  const dropdownRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()

  const toggleDropdown = () => {
    setDropdown(prev => !prev)
  }

  const handleClickOutside = () => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdown(false)
    }
  }

  useEffect(() => {
    if (!isLoading && Object.entries(userData).length > 0) {
      setUserExist(true)
    }
  }, [userData, isLoading])

  useEffect(() => {
    if (dropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdown])

  const isActive = (path) => location.pathname === path ? 'text-[#DAC887]' : ''

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/logout`, {}, {
        withCredentials: true
      })
      setUserExist(false)
      setUserData({})
      toast.success('Successfully Logged Out')
    } catch (err) {
      toast.error('Something Went Wrong')
    }

    setDropdown(false)
  }

  return (
    <>
      <div className={`relative flex w-full items-center justify-between ${userData ? 'xl:px-32 xs:px-12 px-5' : "px-48"} py-4 text-lg shadow-lg bg-black text-white`}>
        <div>
          <img src="/logo1.png" alt="AuraTime" className='h-7 xs:h-10 cursor-pointer' onClick={() => navigate('/')} />
        </div>
        <div className='block md:hidden'>
          {menuOpen ? (
            <RxCross2 className='text-2xl cursor-pointer text-[#DAC887]' onClick={() => setMenuOpen(false)} />
          ) : (
            <FaBars className='text-2xl cursor-pointer text-[#DAC887]' onClick={() => setMenuOpen(true)} />
          )}
        </div>
        <div className={`md:flex gap-${userExist ? '6' : '8'} font-semibold text-lg font-manrope items-center hidden`}>
          <div className={`hover:text-[#DAC887] ${isActive('/')}`}><Link to={'/'}>HOME</Link></div>
          <div className={`hover:text-[#DAC887] ${isActive('/about')}`}><Link to={'/about'}>ABOUT</Link></div>
          {userExist &&
            <div className={`hover:text-[#DAC887] ${isActive('/dashboard')}`}><Link to={'/dashboard'}>PRODUCTS</Link></div>
          }
          <div className={`hover:text-[#DAC887] ${isActive('/contact')}`}><Link to={'/contact'}>CONTACT</Link></div>
          <div className='flex gap-5 items-center'>

            {userExist &&
              <>
                <div className='relative' ref={dropdownRef}>
                  <FaUser className='text-xl cursor-pointer' onClick={toggleDropdown} />
                  {dropdown && (
                    <div className='absolute right-0 mt-3 w-36 bg-white text-black rounded-lg shadow-lg z-10'>
                      <Link to='/profile' onClick={() => setDropdown(false)}>
                        <div className='px-4 py-2 hover:bg-gray-200 rounded-lg'>
                          Profile
                        </div>
                      </Link>
                      <Link to='/' onClick={handleLogout}>
                        <div className='px-4 py-2 rounded-lg hover:bg-gray-200 '>
                          Logout
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
                <div>
                  <FaCartShopping className='text-xl cursor-pointer' onClick={toggleCart} />
                </div>
              </>
            }
          </div>
        </div>
      </div>
      <div className={`absolute md:hidden flex flex-col justify-center w-full bg-black py-2 gap-4 font-semibold text-lg font-manrope items-center text-white ${menuOpen ? 'flex' : 'hidden'}`}>
        <div className={`hover:text-[#DAC887] ${isActive('/')}`}><Link to={'/'}>HOME</Link></div>
        <div className={`hover:text-[#DAC887] ${isActive('/about')}`}><Link to={'/about'}>ABOUT</Link></div>
        {userExist &&
          <div className={`hover:text-[#DAC887] ${isActive('/dashboard')}`}><Link to={'/dashboard'}>PRODUCTS</Link></div>
        }
        <div className={`hover:text-[#DAC887] ${isActive('/contact')}`}><Link to={'/contact'}>CONTACT</Link></div>
        <div className='flex gap-5 items-center'>

          {userExist &&
            <>
              <div className='relative' ref={dropdownRef}>
                <FaUser className='text-xl cursor-pointer' onClick={toggleDropdown} />
                {dropdown && (
                  <div className='absolute right-0 mt-3 w-36 bg-white text-black rounded-lg shadow-lg z-10'>
                    <Link to='/profile' onClick={() => setDropdown(false)}>
                      <div className='px-4 py-2 hover:bg-gray-200 rounded-lg'>
                        Profile
                      </div>
                    </Link>
                    <Link to='/' onClick={handleLogout}>
                      <div className='px-4 py-2 rounded-lg hover:bg-gray-200 '>
                        Logout
                      </div>
                    </Link>
                  </div>
                )}
              </div>
              <div>
                <FaCartShopping className='text-xl cursor-pointer' onClick={toggleCart} />
              </div>
            </>
          }
        </div>
      </div>
    </>
  )
}

export default Header
