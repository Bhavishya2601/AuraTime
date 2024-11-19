import React, { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

import { FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

const Header = ({toggleCart}) => {
  const [dropdown, setDropdown] = useState(false)
  const { userData, isLoading } = useUser()
  const [userExist, setUserExist] = useState(false)
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

  return (
    <div className={`flex w-full items-center justify-between ${userData ? 'px-32' : "px-48"} py-4 text-lg shadow-lg bg-black text-white`}>
      <div>
        <img src="logo1.png" alt="AuraTime" className='h-10 cursor-pointer' onClick={()=> navigate('/')} />
      </div>
      <div className={`flex gap-${userExist ? '6' : '8'} font-semibold text-lg font-manrope items-center`}>
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
                {/* <img src={user} alt="user" className='h-6 cursor-pointer' onClick={toggleDropdown} /> */}
                <FaUser className='text-xl cursor-pointer' onClick={toggleDropdown} />
                {dropdown && (
                  <div className='absolute right-0 mt-3 w-36 bg-white text-black rounded-lg shadow-lg z-10'>
                    <Link to='/profile' onClick={() => setDropdown(false)}>
                      <div className='px-4 py-2 hover:bg-gray-200 rounded-lg'>
                        Profile
                      </div>
                    </Link>
                    <Link to='/logout' onClick={() => setDropdown(false)}>
                      <div className='px-4 py-2 rounded-lg hover:bg-gray-200 '>
                        Logout
                      </div>
                    </Link>
                  </div>
                )}
              </div>
              <div>
                <FaCartShopping className='text-xl cursor-pointer' onClick={toggleCart}/>
              </div>
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default Header
