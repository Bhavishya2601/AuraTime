import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../context/UserContext'

import user from '../assets/user.svg'

const Header = () => {
  const [dropdown, setDropdown] = useState(false)
  const { userData, setUserData, isLoading} = useUser()
  // const dropdownRef = useRef(null)

  const toggleDropdown = () => {
    setDropdown(prev => !prev)
  }

  // const handleClickOutside = (e) =>{
  //   if (dropdown.current && !dropdown.current.contains(e.target)){
  //     setTimeout(() => setDropdown(false), 1);
  //   }
  // }

  // React.useEffect(()=>{
  //   document.addEventListener('mousedown', handleClickOutside)
  //   return () => {
  //     document.addEventListener('mousedown', handleClickOutside)
  //   }
  // }, [])

  return (
    <div className='flex w-full items-center justify-between px-48 py-4 text-lg shadow-lg bg-black text-white'>
      <div>
        <img src="logo1.png" alt="AuraTime" className='h-10' />
      </div>
      <div className='flex gap-10 font-semibold text-lg font-manrope items-center'>
        <div className='hover:text-[#CBBA9C]'><Link to={'/'}>HOME</Link></div>
        <div className='hover:text-[#DAC887]'><Link to={'/about'}>ABOUT</Link></div>
        <div className='hover:text-[#DAC887]'><Link to={'/contact'}>CONTACT</Link></div>
        {userData && <div className='relative' 
        // ref={dropdownRef}
        >
          <img src={user} alt="user" className='h-6 cursor-pointer' onClick={toggleDropdown} />
          {dropdown && (
            <div className='absolute right-0 mt-3 w-36 bg-white text-black rounded-lg shadow-lg'>
              <Link to='/profile'>
                <div className='px-4 py-2 hover:bg-gray-200 rounded-lg'>
                  Profile
                </div>
              </Link>
              <div className='px-4 py-2 rounded-lg hover:bg-gray-200 '>
                <Link to='/logout'>Logout</Link>
              </div>
            </div>
          )}
        </div>}
      </div>
    </div>
  )
}

export default Header
