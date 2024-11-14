import React from 'react'
import Footer from '../components/Footer'
import { useLocation } from 'react-router-dom'


const Product = () => {
    const location = useLocation()
    const { img, name, prev, price } = location.state

    return (
        <div className='relative'>
            <div className='fixed w-full  h-10 bottom-10 flex justify-center'>
                <div className='w-4/5 bg-red-500 h-10'>hello</div>
            </div>
            <div className='m-10 flex font-manrope'>
                <div className='w-1/2 flex justify-center'>
                    <img src={img} alt="image" className='w-4/5' />
                </div>
                <div className='w-1/2 px-8'>
                    <div className='flex flex-col px-5 py-10 gap-5'>
                        <div className='flex flex-col gap-2'>

                        <div className='text-2xl font-bold'>{name}</div>
                        <div className='flex gap-3 font-bold text-lg'>
                            <div className='line-through text-gray-500'>{prev}</div>
                            <div className='text-[#c4a877] font-bold'>{price} USD</div>
                        </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <div className='text-gray-500 text-xs font-sans'>Inclusive of all taxes*</div>
                            <button className='border-2 border-black font-bold w-2/5 py-2 hover:bg-[#cbba9c] hover:border-[#cbba9c] hover:text-white transition-all duration-200'>Add to Cart</button>
                        </div>
                        {/* <hr className='h-[2px] rounded-full w-full border-none bg-gray-100 mt-10 mb-5' />
                        <div className='text-gray-400 text-md'>
                            Made from real leather Eenean viverra rhoncus pede. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Vivamus consectetuer hendrerit lacus. Nullam dictum felis eu pede mollis pretium. Proin faucibus arcu quis ante. In hac habitasse..</div> */}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Product
