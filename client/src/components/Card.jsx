import React from 'react'

const Card = ({props}) => {
  return (
    <div className='w-[23%] flex flex-col gap-3 items-center h-[60vh] cursor-pointer'>
        <div className='overflow-hidden bg-[#f8f8f8] w-full h-4/5 flex justify-center'><img src={`watch/${props.img}`} alt="watch" className='hover:scale-110 transition-all duration-700 h-[95%] w-auto' /></div>
        <div className='text-lg font-black font-manrope'>{props.name}</div>
        <div className='font-manrope text-[#CBBA9C] font-bold'><span className='line-through text-gray-500'>{props.prev}</span> {props.price}</div>
    </div>
  )
}

export default Card
