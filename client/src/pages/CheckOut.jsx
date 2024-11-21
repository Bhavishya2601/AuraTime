import React from 'react'
import { MdError } from "react-icons/md";
import Footer from '../components/Footer'

const CheckOut = ({cartProduct}) => {
  console.log(cartProduct)


  return (
    <>
    <div className='flex'>
      <div className='w-[55vw] pl-44 py-10 pr-10 flex flex-col gap-6 font-manrope'>
        <div className='flex flex-col gap-3'>
          <div className='text-2xl'>Contact</div>
          <input type="text" className='px-4 py-2 w-full outline-none border-2 rounded-md focus:border-[#DAC887] transition-all duration-300' placeholder='Email or mobile phone Number' />
          <div className='flex gap-3'>
            <input type="checkbox" className='w-4 accent-black checked:ring-1 checked:ring-white' />
            <div>Email me with news and offers</div>
          </div>
        </div>
        <div className='flex flex-col gap-3'>
          <div className='text-2xl'>Delivery</div>
          <div className='flex gap-2'>
            <input type="text" className='px-4 py-2 w-1/2 outline-none border-2 rounded-md focus:border-[#DAC887] transition-all duration-300' placeholder='First Name' />
            <input type="text" className='px-4 py-2 w-1/2 outline-none border-2 rounded-md focus:border-[#DAC887] transition-all duration-300' placeholder='Last Name (optional)' />
          </div>
          <input type="text" className='px-4 py-2 w-full outline-none border-2 rounded-md focus:border-[#DAC887] transition-all duration-300' placeholder='Address' />
          <input type="text" className='px-4 py-2 w-full outline-none border-2 rounded-md focus:border-[#DAC887] transition-all duration-300' placeholder='Apartment, suite, etc. (optional)' />
          <div className='flex gap-2'>
            <input type="text" className='px-4 py-2 w-1/2 outline-none border-2 rounded-md focus:border-[#DAC887] transition-all duration-300' placeholder='City' />
            <input type="text" className='px-4 py-2 w-1/2 outline-none border-2 rounded-md focus:border-[#DAC887] transition-all duration-300' placeholder='Postal Code' />
          </div>
          <div className='flex gap-3'>
            <input type="checkbox" className='w-4 accent-black checked:ring-1 checked:ring-white' />
            <div>Save this information for next time</div>
          </div>
        </div>
        <div className='flex flex-col gap-3'>
          <div className='text-lg'>Shipping method</div>
          <div className='px-4 py-2 w-full border-2 rounded-md border-[#DAC887] bg-[#fdf6dd] flex justify-between'>
            <div>Standard</div>
            <div className='font-semibold tracking-wider'>FREE</div>
          </div>
        </div>
        <div className='flex flex-col gap-1'>
          <div className='text-2xl font-semibold'>Payment</div>
          <div className='text-[#aaaaaa]'>All transactions are secure and encrypted.</div>
          <div className='h-32 bg-[#f6f6f6] flex flex-col gap-1 justify-center items-center'>
            <MdError className='text-[#aaaaaa] text-4xl'/>
            <div className='text-md text-[#aaaaaa]'>This store can't accept payments right now</div>
          </div>
          <button className='w-full py-3 text-lg border-2 rounded-lg cursor-not-allowed flex justify-center bg-[#f6f6f6] my-3'>Pay Now</button>
        </div>
      </div>
      <div className='w-[45vw] bg-[#f6f6f6] pr-28'>
        {cartProduct.map((product)=>{
          return (
            <img src={product.img} />
          )
        })}
      </div>
    </div>
    <Footer />
    </>
  )
}

export default CheckOut
