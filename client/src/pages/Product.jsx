import React, { useEffect, useState } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import crypto from 'crypto-js'

import Footer from '../components/Footer'
import BestSeller from '../components/BestSeller'
import { useUser } from '../context/UserContext'
import ImageMagnifier from '../components/ImageMagnifier'

import { FaPercent } from "react-icons/fa";
import { IoIosCheckbox } from "react-icons/io";
import { MdMiscellaneousServices } from "react-icons/md";

const Product = ({toggleCart, updatedCartProduct}) => {
    const navigate = useNavigate()
    const {userData} = useUser()
    const [cartProduct, setCartProduct] = useState([])
    const [userkey, setUserkey] = useState(null)
    const [isVisible, setIsVisible] = useState(false)
    const location = useLocation()
    const { id, img, name, prev, price, gender, tags } = location.state

    const userEmail = userData?.email

    
    const truncate = (name) => {
        if (name.length > 30)
            return name.slice(0, 30) + '...'
        return name
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [location])
    
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }
        
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const generateUniqueKey = (email) => {
        if (email){
            return crypto.MD5(email).toString()
        }
        return null
    }

    useEffect(()=>{
        if (userEmail){
            const key =generateUniqueKey(userEmail)
            setUserkey(key)

            const storedCart = JSON.parse(localStorage.getItem(`cart_${key}`)) || []
            updatedCartProduct(storedCart)
            setCartProduct(storedCart)
        }
    }, [userEmail])

    const addToCart = () => {
        const newItem = {
            id, img, name, price, quantity : 1
        }
        const existingCart = [...cartProduct]
        const productIndex = existingCart.findIndex(item => item.id === id)
        if (productIndex !== -1){
            existingCart[productIndex].quantity += 1;
        } else {
            existingCart.push(newItem)
        }
        // console.log(existingCart)   
        setCartProduct(existingCart)
        if (userkey){
            localStorage.setItem(`cart_${userkey}`, JSON.stringify(existingCart))
        }
        updatedCartProduct(existingCart)
        toggleCart()
    }

    const buyNow = () => {
        addToCart()
        toggleCart()
        navigate('/checkout')
    }

    return (
        <div className='relative'>
            <div className={`fixed w-full bottom-10 flex justify-center z-10 ${isVisible ? 'opacity-100' : 'opacity-0'} transition-all duration-300`}>
                <div className='flex justify-between bg-white w-4/5 items-center px-2 xxs:px-5 py-1 font-manrope border-2 shadow-2xl'>
                    <div className='hidden xl:flex gap-6 items-center w-1/2'>
                        <img src={img} alt="img" className='h-16' />
                        <div className='text-font text-xl'>{truncate(name)}</div>
                        <div className='flex flex-col gap-[2px]'>
                            <div className='text-xl font-bold'>USD {price}</div>
                            <div className='text-gray-500 text-sm font-sans'>inclusive of all taxes*</div>
                        </div>
                    </div>
                    <div className='w-full xl:w-1/2 flex justify-end gap-3'>
                    
                        <button className='border-2 border-black font-bold w-1/2 xl:w-2/5 py-2 hover:bg-[#cbba9c] hover:border-[#cbba9c] hover:text-white transition-all duration-200' onClick={addToCart}>Add to Cart</button>
                        <button className='border-2 border-black bg-black text-white font-bold w-1/2 xl:w-2/5 py-2 hover:bg-[#cbba9c] hover:border-[#cbba9c] hover:text-white transition-all duration-200' onClick={buyNow}>Buy it Now</button>
                    </div>
                </div>
            </div>

            <div className='mx-5 my-5 xl:m-10 flex flex-col gap-10 lg:gap-0 lg:flex-row font-manrope'>
                <div className='w-full lg:w-1/2 flex justify-center'>
                    {/* <img src={img} alt="image" className='w-4/5' /> */}
                    <ImageMagnifier width="600px" src={img} />
                </div>
                <div className='w-full lg:w-1/2 px-0 sm:px-8'>
                    <div className='flex flex-col px-0 xs:px-5 gap-5'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex gap-3'>
                                {tags.map((tag, index) => {
                                    return <div key={index} className='bg-[#f8f8f8] text-xs p-1'>{tag}</div>
                                })}
                            </div>
                            <div className='flex flex-col'>
                                <div className='text-2xl font-bold'>{name}</div>
                                <div className='text-sm'>{gender}'s watch</div>
                            </div>
                            <div className='flex gap-1 font-bold text-lg'>
                                <div className='line-through text-gray-500'>{prev}</div>
                                <div className='text-[#c4a877] font-bold'>{price} USD</div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <div className='text-gray-500 text-xs font-sans'>Inclusive of all taxes*</div>
                            <div className='flex gap-5'>
                                <button className='border-2 border-black font-bold w-2/5 py-2 hover:bg-[#cbba9c] hover:border-[#cbba9c] hover:text-white transition-all duration-200' onClick={addToCart}>Add to Cart</button>
                                <button className='border-2 border-black bg-black text-white font-bold w-2/5 py-2 hover:bg-[#cbba9c] hover:border-[#cbba9c] hover:text-white transition-all duration-200' onClick={buyNow}>Buy it Now</button>
                            </div>
                        </div>
                        <div>
                            For more details on this product, please <Link to={'/contact'} className='underline'>contact us</Link>
                        </div>
                        <hr className='my-5 border-[1px]' />
                        <div className='flex justify-between'>
                            <div className='flex flex-col justify-center items-center w-1/3 border-r-2'>
                                <div className='bg-[#cbba9c] rounded-full p-3 flex-none'>
                                    <FaPercent className='text-white' />
                                </div>
                                <div className='text-sm'>Discount On</div>
                                <div className='text-sm'>Prepaid Order</div>
                            </div>
                            <div className='flex flex-col justify-center items-center w-1/2 xs:w-1/3 border-r-2'>
                                <div className='bg-[#cbba9c] rounded-full p-3 flex-none'>
                                    <IoIosCheckbox className='text-white text-xl' />
                                </div>
                                <div className='text-sm'>7 Day Returns</div>
                                <div className='text-sm'>No Questions Asked</div>
                            </div>
                            <div className='flex flex-col justify-center items-center w-1/3 '>
                                <div className='bg-[#cbba9c] rounded-full p-[6px] flex-none'>
                                    <MdMiscellaneousServices className='text-white text-3xl' />
                                </div>
                                <div className='text-sm'>Servicing</div>
                                <div className='text-sm'>Available</div>
                            </div>
                        </div>
                        <div className='bg-[url(https://justintime.in/cdn/shop/files/Group_48246.svg?v=1727435443)] flex gap-5 px-10 py-5'>
                            <div>
                                <img src="https://justintime.in/cdn/shop/files/24_Months.png?v=1729243702" alt="Warranty" className='h-20' />
                            </div>
                            <div className='text-white flex flex-col font-serif justify-center text-xl xs:text-2xl'>
                                <div>24 Months</div>
                                <div>Manufacturer Warranty</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BestSeller key={id} title="RELATED PRODUCTS" />

            <Footer />
        </div>
    )
}

export default Product
