import React from 'react'
import { Link } from 'react-router-dom'

const Error_404 = () => {
  return (
    <div className='flex flex-col gap-3 items-center justify-center font-wallpoet font-bold h-[calc(100vh-72px)] bg-black text-white'>
      <div className='text-2xl xxs:text-3xl sm:text-5xl lg:text-7xl'>404 Page Not Found</div>
      <div className='xxs:text-xl'>Return to <Link to={'/'} className='font-bold'>Home</Link></div>
    </div>
  )
}

export default Error_404
