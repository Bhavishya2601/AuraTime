import React, { useEffect, useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import crypto from 'crypto-js'
import { useUser } from '../context/UserContext'
import { AiFillDelete } from "react-icons/ai";


const CartSlider = ({ data }) => {
  const { cart, setCart, cartProduct, watches, updatedCartProduct } = data
  const navigate = useNavigate()
  const [totalPrice, setTotalPrice] = useState(0)
  const [itemCount, setItemCount] = useState(0)
  const [userkey, setUserkey] = useState(null)
  const [cartItems, setCartItems] = useState([])
  const {userData} = useUser()
  const userEmail = userData?.email

  const calculatePrice = () => {
    let total = 0;
    let count = 0;
    cartItems.forEach((watch) => {
      const price = parseFloat(watch.price.replace(/[^\d.-]/g, ''));
      total += price * watch.quantity
      count += watch.quantity
    });
    setTotalPrice(total)
    setItemCount(count)
  }

  const generateUniqueKey = (email) => {
    if (email){
        return crypto.MD5(email).toString()
    }
    return null
}

  useEffect(() => {
    calculatePrice()
  }, [cartItems])

  useEffect(()=>{
    setCartItems(cartProduct)
  }, [cartProduct])

  useEffect(()=>{
    if (userEmail){
        const key =generateUniqueKey(userEmail)
        setUserkey(key)

        const storedCart = JSON.parse(localStorage.getItem(`cart_${key}`)) || []
        setCartItems(storedCart)
    }
}, [userEmail])

  const handleToShop = () => {
    setCart(false);
    navigate('/dashboard')
  }

  const truncate = (name) => {
    if (name.length > 32)
      return name.slice(0, 32) + '...'
    return name
  }

  const GotoProduct = (id) => {
    const product = watches.find((watch) => watch.id === id)
    navigate('/product', {
      state: product
    })
    setCart(false)
  }

  const handleToCheckout = () => {
    navigate('/checkout')
    updatedCartProduct(cartItems)
    setCart(false)
  }

    const handleDeleteWatch = (id) => {
      let response = cartItems.map((product)=>{
        if (product.id === id){
          if (product.quantity > 1){
            return {...product, quantity : product.quantity-=1}
          } else {
            return null
          }
        }
        return product
      }).filter((product)=> product!=null)
      setCartItems(response)
      localStorage.setItem(`cart_${userkey}`, JSON.stringify(response))
      updatedCartProduct(response)
    }

  return (
    <>
      <div
        className={`top-0 right-0 h-full w-full xxs:w-3/4 sm:w-1/2 lg:w-[30%] bg-[#f8f8f8] fixed duration-500 transition-transform z-20 ${cart ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="font-manrope text-xl flex justify-between px-5 items-center font-bold h-12">
          <div>
            <RxCross1
              onClick={() => setCart(false)}
              className="text-xl font-bold cursor-pointer"
            />
          </div>
          <div>Shopping Cart</div>
          <div>{itemCount}</div>
        </div>
        <hr className="border-black" />
        {cartItems.length === 0 ? <div className="flex flex-col justify-center gap-5 items-center h-[calc(100vh-100px)]">
          <div className="font-semibold text-3xl">Your Cart is empty</div>
          <div
            className="bg-black text-white px-7 py-3 font-bold uppercase tracking-widest cursor-pointer"
            onClick={handleToShop}
          >
            Go to Shop
          </div>
        </div> :
          <div className='flex flex-col justify-between h-[calc(100vh-48px)]'>
            <div className='flex flex-col gap-2 p-3 h-[calc(77vh)] overflow-y-auto'>
              {cartItems.map((product) => {
                return <div key={product.id} className='flex justify-between'>
                  <img src={product.img} alt={product.name} className='h-24 cursor-pointer' onClick={() => GotoProduct(product.id)} />
                  <div className='flex flex-col gap-[2px] w-4/5 font-manrope justify-center'>
                    <div className='hover:text-[#DAC887] cursor-pointer' onClick={() => GotoProduct(product.id)}>{truncate(product.name)}</div>
                    <div>QTY : {product.quantity}</div>
                    <div>{product.price}</div>
                  </div>
                  <div className='flex pt-3 '>
                    <AiFillDelete className='text-xl cursor-pointer' onClick={()=>handleDeleteWatch(product.id)}/>
                  </div>
                </div>
              })}
            </div>
            <div className='flex flex-col'>
              <div className='flex justify-between px-5 font-manrope font-bold text-xl h-12 bg-white items-center'>
                <div>Total:</div>
                <div className='text-[#DAC887]'>$ {totalPrice}</div>
              </div>
              <div className='flex '>
                <button className='w-1/2 h-16 bg-[#2A2A2A] text-white font-bold font-manrope uppercase text-lg hover:bg-[#DAC887] transition-all duration-500' onClick={handleToShop}>continue shopping</button>
                <button className='w-1/2 h-16 bg-[#111111] text-white font-bold font-manrope uppercase text-lg tracking-widest hover:bg-[#DAC887] transition-all duration-500' onClick={handleToCheckout}>checkout</button>
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
