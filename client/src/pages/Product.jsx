import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'

import Footer from '../components/Footer'
import BestSeller from '../components/BestSeller'

const Product = () => {
    const [isVisible, setIsVisible] = useState(false)
    const location = useLocation()
    const { id, img, name, prev, price, gender, tags } = location.state

    const truncate = (name) => {
        if (name.length > 30)
            return name.slice(0, 30) + '...'
        return name
    }

    useEffect(()=>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [location])

    useEffect(()=>{
        const handleScroll = () =>{
            if (window.scrollY > 20){
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return ()=>{
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <div className='relative'>
            <div className={`fixed w-full bottom-10 flex justify-center z-10 ${isVisible ? 'opacity-100' : 'opacity-0'} transition-all duration-300`}>
                <div className='flex justify-between bg-white w-4/5 items-center px-5 py-1 font-manrope border-2 shadow-2xl'>
                    <div className='flex gap-6 items-center w-1/2'>
                        <img src={img} alt="img" className='h-16' />
                        <div className='text-font text-xl'>{truncate(name)}</div>
                        <div className='flex flex-col gap-[2px]'>
                            <div className='text-xl font-bold'>USD {price}</div>
                            <div className='text-gray-500 text-sm font-sans'>inclusive of all taxes*</div>
                        </div>
                    </div>
                    <div className='w-1/2 flex justify-end gap-3'>
                        <button className='border-2 border-black font-bold w-2/5 py-2 hover:bg-[#cbba9c] hover:border-[#cbba9c] hover:text-white transition-all duration-200'>Add to Cart</button>
                        <button className='border-2 border-black bg-black text-white font-bold w-2/5 py-2 hover:bg-[#cbba9c] hover:border-[#cbba9c] hover:text-white transition-all duration-200'>Buy it Now</button>
                    </div>
                </div>
            </div>

            <div className='m-10 flex font-manrope'>
                <div className='w-1/2 flex justify-center'>
                    <img src={img} alt="image" className='w-4/5' />
                </div>
                <div className='w-1/2 px-8'>
                    <div className='flex flex-col px-5 gap-5'>
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
                                <button className='border-2 border-black font-bold w-2/5 py-2 hover:bg-[#cbba9c] hover:border-[#cbba9c] hover:text-white transition-all duration-200'>Add to Cart</button>
                                <button className='border-2 border-black bg-black text-white font-bold w-2/5 py-2 hover:bg-[#cbba9c] hover:border-[#cbba9c] hover:text-white transition-all duration-200'>Buy it Now</button>
                            </div>
                        </div>
                        <div>
                        For more details on this product, please <Link to={'/contact'} className='underline'>contact us</Link>
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
