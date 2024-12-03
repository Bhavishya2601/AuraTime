import React, { useState, useEffect } from 'react'
import { MdError } from "react-icons/md";
import Footer from '../components/Footer'
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const CheckOut = ({ cartProduct }) => {
  const navigate = useNavigate()
  const [totalPrice, setTotalPrice] = useState(0)
  const [itemCount, setItemCount] = useState(0)
  const { userData, isLoading } = useUser()

  const truncate = (name) => {
    if (name.length > 40)
      return name.slice(0, 40) + '...'
    return name
  }

  useEffect(() => {
    if (!isLoading) {
      if (Object.entries(userData).length === 0) {
        navigate('/login')
      }
    }
  }, [userData, isLoading])

  const calculatePrice = () => {
    let total = 0;
    let count = 0;
    cartProduct.forEach((watch) => {
      const price = parseFloat(watch.price.replace(/[^\d.-]/g, ''));
      total += price * watch.quantity
      count += watch.quantity
    });
    setTotalPrice(total)
    setItemCount(count)
  }

  useEffect(() => {
    calculatePrice()
  }, [cartProduct])


  return (
    <>
      <div className='flex lg:flex-row flex-col-reverse justify-center items-center lg:justify-between lg:items-stretch'>
        <div className='w-full lg:w-[55vw] px-5 xs:pl-10 lg:pl-20 xl:pl-44 py-10 xs:pr-10 flex flex-col gap-6 font-manrope'>
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
            <div className='flex flex-col xs:flex-row gap-2'>
              <input type="text" className='px-4 py-2 w-full xs:w-1/2 outline-none border-2 rounded-md focus:border-[#DAC887] transition-all duration-300' placeholder='First Name' />
              <input type="text" className='px-4 py-2 w-full xs:w-1/2 outline-none border-2 rounded-md focus:border-[#DAC887] transition-all duration-300' placeholder='Last Name (optional)' />
            </div>
            <input type="text" className='px-4 py-2 w-full outline-none border-2 rounded-md focus:border-[#DAC887] transition-all duration-300' placeholder='Address' />
            <input type="text" className='px-4 py-2 w-full outline-none border-2 rounded-md focus:border-[#DAC887] transition-all duration-300' placeholder='Apartment, suite, etc. (optional)' />
            <div className='flex flex-col xs:flex-row gap-2'>
              <input type="text" className='px-4 py-2 w-full xs:w-1/2 outline-none border-2 rounded-md focus:border-[#DAC887] transition-all duration-300' placeholder='City' />
              <input type="text" className='px-4 py-2 w-full xs:w-1/2 outline-none border-2 rounded-md focus:border-[#DAC887] transition-all duration-300' placeholder='Postal Code' />
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
              <MdError className='text-[#aaaaaa] text-4xl' />
              <div className='text-md text-[#aaaaaa] text-center w-[90%]'>This store isn't accepting payments right now</div>
            </div>
            <button className='w-full py-3 text-lg border-2 rounded-lg cursor-not-allowed flex justify-center bg-[#f6f6f6] my-3'>Pay Now</button>
          </div>
        </div>
        <div className='w-full lg:w-[45vw] bg-[#f6f6f6] lg:pr-10 xl:pr-24 p-3 py-10 xs:p-8 flex flex-col gap-5'>
          <div className='flex flex-col gap-4 max-h-[65vh] overflow-y-auto pr-5'>
            {cartProduct.map((product) => {
              return (
                <div className='flex justify-between items-center'>
                  <div className='flex gap-3 items-center'>
                    <img src={product.img} className='h-[75px] border-2 border-gray-200' />
                    <div className='flex flex-col gap-1'>
                      <div className='xs:text-[17px]'>{truncate(product.name)}</div>
                      <div className='text-sm'>QTY: {product.quantity}</div>
                    </div>
                  </div>
                  <div className='text-lg'>{product.price}</div>
                </div>
              )
            })}
          </div>
          <div className='pr-5 xs:pr-10 flex flex-col gap-1'>

          <div className='flex justify-between'>
            <div>Subtotal ( {itemCount} items )</div>
            <div>$ {totalPrice}</div>
          </div>
          <div className='flex justify-between'>
            <div>Shipping</div>
            <div>FREE</div>
          </div>
          <div className='flex justify-between'>
            <div>Estimated taxes</div>
            <div>$ {totalPrice/10}</div>
          </div>
        </div>
        <div className='flex justify-between pr-5 xs:pr-10'>
          <div className='font-bold text-lg'>Total</div>
          <div className='font-bold text-lg'>$ {totalPrice + totalPrice/10}</div>
        </div>
          </div>
      </div>
      <Footer />
    </>
  )
}

export default CheckOut
