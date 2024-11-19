import React, { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';

import { AiFillDelete } from "react-icons/ai";


const CartSlider = ({ data }) => {
  const {cart, setCart, cartProduct, watches} = data
  const navigate = useNavigate()

  const handleToShop1 = () => {
    setCart(false);
    navigate('/dashboard')
  }

  const truncate = (name) => {
    if (name.length > 25)
      return name.slice(0, 25) + '...'
    return name
  }

  const GotoProduct = (id) => {
    const product = watches.find((watch)=> watch.id===id)
    navigate('/product', {
      state: product
    })
    setCart(false)
  }

  return (
    <>
      <div
        className={`top-0 right-0 h-full w-[30%] bg-[#f8f8f8] fixed duration-500 transition-transform z-20 ${cart ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div>
          <RxCross1
            onClick={() => setCart(false)}
            className="absolute top-4 right-4 text-xl font-bold cursor-pointer"
          />
        </div>
        <div className="font-manrope text-xl flex justify-center items-center font-bold h-12">
          Shopping Cart
        </div>
        <hr className="border-black" />
        {cartProduct.length === 0 ? <div className="flex flex-col justify-center gap-5 items-center h-[calc(100vh-100px)]">
          <div className="font-semibold text-3xl">Your Cart is empty</div>
          <div
            className="bg-black text-white px-7 py-3 font-bold uppercase tracking-widest cursor-pointer"
            onClick={handleToShop1}
          >
            Go to Shop
          </div>
        </div> :
          <div className='flex flex-col justify-between h-[calc(100vh-48px)]'>
            <div className='flex flex-col gap-2 p-3'>
              {cartProduct.map((product) => {
                return <div key={product.id} className='flex justify-between'>
                  <img src={product.img} alt={product.name} className='h-24 cursor-pointer' onClick={()=>GotoProduct(product.id)} />
                  <div className='flex flex-col gap-[2px] w-3/5 font-manrope justify-center'>
                    <div className='hover:text-[#DAC887] cursor-pointer' onClick={()=>GotoProduct(product.id)}>{truncate(product.name)}</div>
                    <div>QTY : {product.quantity}</div>
                    <div>{product.price}</div>
                  </div>
                  <div className='flex pt-3 '>
                    <AiFillDelete className='text-xl cursor-pointer' />
                  </div>
                </div>
              })}
            </div>
            <div className='flex flex-col'>
              <div className='flex justify-between px-5 font-manrope font-bold text-xl h-12 bg-white items-center'>
                <div>Total:</div>
                <div className='text-[#DAC887]'>totalprice</div>
              </div>
              <div>
                <button className='w-full h-16 bg-[#2A2A2A] text-white font-bold font-manrope uppercase text-lg tracking-widest hover:bg-[#DAC887] transition-all duration-500'>checkout</button>
              </div>
            </div>
          </div>
        }
      </div>

      {cart && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-60 z-10"
          onClick={() => setCart(false)}
        />
      )}
    </>
  );
};

export default CartSlider;
