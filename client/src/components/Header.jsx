import React from 'react'
import {Link} from 'react-router-dom'


const Header = () => {
  return (
    <div className='container mx-auto flex w-full items-center justify-between px-48 py-4 text-lg shadow-lg'>
      <div>logo</div> 
      <div className='flex gap-10'>
        <div><Link to={'/'}>Home</Link></div>
        <div><Link to={'/about'}>About</Link></div>
        <div><Link to={'/contact'}>Contact</Link></div>
      </div>
    </div>
  )
}

export default Header
