import React from 'react'

const Blog = ({props}) => {
    return (
    <div className='w-[31%] flex flex-col gap-2 items-center'>
        <img src={`img/${props.img}`} alt="blog1" />
        <div className='font-semibold text-gray-500'>NEWS</div>
        <div className='font-bold text-2xl font-manrope'>{props.name}</div>
        <hr className='h-[1px] bg-[#CBBA9C] border-none w-[50px]'/>
        <div className='text-center text-sm text-gray-500'>{props.desc}</div>
    </div>
    )
}

export default Blog
