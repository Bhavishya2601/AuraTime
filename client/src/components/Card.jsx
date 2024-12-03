import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

const Card = ({props}) => {
  const {userData, isLoading} = useUser()
  const navigate = useNavigate()
  const truncate = (name) =>{
    if (name.length > 30) 
      return name.slice(0, 27) + '...'
    return name
  }

  const handleClick = () => {
    if (!isLoading && Object.entries(userData).length === 0){
      navigate('/login')
    } else {
      navigate('/product', {
        state: props
      })
    }
  }

  return (
    <div className='w-[45%] xs:w-[47%] lg:w-[30%] xl:w-[23%] flex flex-col justify-between xs:gap-2 lg:gap-3 items-center  cursor-pointer' onClick={handleClick}>
        <div className='overflow-hidden bg-[#f8f8f8] w-full h-[200px] xxs:h-[250px] sm:h-[350px] flex justify-center'><img src={props.img} alt="watch" className='hover:scale-110 transition-all duration-700 h-[95%] w-auto' /></div>
        <div className='sm:text-lg font-black font-manrope'>{truncate(props.name)}</div>
        <div className='font-manrope text-[#c4a877] font-bold'><span className='line-through text-gray-500'>{props.prev}</span> {props.price}</div>
    </div>
  )
}

export default Card
