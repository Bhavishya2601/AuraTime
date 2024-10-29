import React from 'react'
import {Link} from 'react-router-dom'


const Header = () => {
  return (
    <div className='flex w-full items-center justify-between px-48 py-4 text-lg shadow-lg bg-black   text-white'>
      <div>
        <img src="logo1.png" alt="AuraTime" className='h-10' />
      </div> 
      <div className='flex gap-10 font-semibold text-lg font-manrope'>
        <div className='hover:text-[#CBBA9C]'><Link to={'/'}>HOME</Link></div>
        <div className='hover:text-[#DAC887]'><Link to={'/about'}>ABOUT</Link></div>
        <div className='hover:text-[#DAC887]'><Link to={'/contact'}>CONTACT</Link></div>
      </div>
    </div>
  )
}

export default Header
