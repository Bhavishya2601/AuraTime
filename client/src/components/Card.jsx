import React from 'react'
import { useNavigate } from 'react-router-dom'

const Card = ({props}) => {
  const navigate = useNavigate()
  const truncate = (name) =>{
    if (name.length > 30) 
      return name.slice(0, 27) + '...'
    return name
  }

  const handleClick = () => {
    navigate('/product', {
      state: props
    })
  }

  return (
    <div className='w-[23%] flex flex-col gap-3 items-center h-[60vh] cursor-pointer' onClick={handleClick}>
        <div className='overflow-hidden bg-[#f8f8f8] w-full h-4/5 flex justify-center'><img src={props.img} alt="watch" className='hover:scale-110 transition-all duration-700 h-[95%] w-auto' /></div>
        <div className='text-lg font-black font-manrope'>{truncate(props.name)}</div>
        <div className='font-manrope text-[#c4a877] font-bold'><span className='line-through text-gray-500'>{props.prev}</span> {props.price}</div>
    </div>
  )
}

export default Card
