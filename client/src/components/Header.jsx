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
  const [mobileDropdown, setMobileDropdown] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { userData, setUserData, isLoading } = useUser()

  const dropdownRef = useRef(null)
  const mobileDropdownRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()

  const toggleDropdown = () => {
    setDropdown(prev => !prev)
  }
  const toggleMobileDropdown = () => {
    setMobileDropdown(prev => !prev)
  }

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdown(false)
    }
    if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target)){
      setMobileDropdown(false)
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
    setMobileDropdown(false)
    setMenuOpen(false)
  }

  const handleMobileClick = () => {
    setMenuOpen(false)
    setMobileDropdown(false)
  }

  return (
    <>
      <div className={`relative z-40 flex w-full items-center justify-between ${userData ? 'xl:px-32 xs:px-12 px-5' : "px-48"} py-4 text-lg shadow-lg bg-black text-white`}>
        <div>
          <img src="/logo1.png" alt="AuraTime" className='h-7 xs:h-10 cursor-pointer' onClick={() => navigate('/')} />
        </div>
        <div className='block md:hidden'>
          {menuOpen ? (
            <RxCross2 className='text-2xl cursor-pointer text-[#DAC887]' onClick={handleMobileClick} />
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
                    <div className='absolute right-0 mt-3 w-36 bg-white text-black rounded-lg shadow-lg z-30 '>
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
      <div className={`absolute md:hidden z-30 flex flex-col justify-center w-full bg-black py-2 gap-4 font-semibold text-lg font-manrope items-center text-white ${menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 invisible'} transform transition-transform duration-1000 ease-in-out`}>
      <Link to={'/'} className=' w-full text-center' onClick={handleMobileClick}><div className={`hover:text-[#DAC887] ${isActive('/')}`}>HOME</div></Link>
      <Link to={'/about'} className=' w-full text-center' onClick={handleMobileClick}><div className={`hover:text-[#DAC887] ${isActive('/about')}`}>ABOUT</div></Link>
        {userExist &&
          <Link to={'/dashboard'} className=' w-full text-center' onClick={handleMobileClick}><div className={`hover:text-[#DAC887] ${isActive('/dashboard')}`}>PRODUCTS</div></Link>
        }
        <Link to={'/contact'} className='w-full text-center' onClick={handleMobileClick}><div className={`hover:text-[#DAC887] ${isActive('/contact')}`}>CONTACT</div></Link>
        <div className='flex gap-5 items-center'>

          {userExist &&
            <>
              <div className='relative' ref={mobileDropdownRef}>
                <FaUser className='text-xl cursor-pointer' onClick={toggleMobileDropdown} />
                {mobileDropdown && (
                  <div className='absolute right-0 mt-3 w-36 bg-white text-black rounded-lg shadow-lg z-50'>
                    <Link to='/profile' onClick={handleMobileClick}>
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
                <FaCartShopping className='text-xl cursor-pointer' onClick={()=>{
                  toggleCart()
                  setMenuOpen(false)
                }} />
              </div>
            </>
          }
        </div>
      </div>
    </>
  )
}

export default Header
