import React from 'react'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <>
      <div className='relative bg-[url("/img/bg10.jpg")] bg-fixed bg-center h-screen'>
        <div className='absolute text-white flex flex-col gap-6 justify-center items-center h-full w-full font-manrope'>
          <div className='text-6xl md:text-8xl font-black'>Our Story</div>
          <div className='sm:text-xl md:text-3xl'>Timeless craftsmanship meets modern innovation.</div>
        </div>
      </div>
      <div className='flex flex-col gap-8 font-manrope my-12 mx-5 md:mx-20 lg:mx-40'>
        <div className='flex flex-col text-3xl font-bold xs:text-4xl md:text-5xl xs:font-semibold sm:gap-3'>
          <div>Unique & Stylist Fashion</div>
          <div>We Are An Awesome Agency.</div>
        </div>
        <div className='tracking-wider'>I am a highly organised and motivated professional Fashion Designer with a wealth of experience in a range of photographic styles and services. Just run your Fashion Store which will be a reflection of you a sexy and confident woman that shines with her unique style. Our goal is to make fashion as easy possible. We bring you the best of glam and sexy clothes while keeping in mind that high quality things arent always too expensive. Our goal is to make fashion as easy as possible, that is why we add carefully selected products on a daily basis, and this is essential for us. This is how you keep up with the times in style! We ship worldwide & space!</div>
        <div>
          <Link to={'/dashboard'} className='underline underline-offset-4 text-[#DAC887] '>EXPLORE MORE</Link>
        </div>
        <div>
          <Link to={'/dashboard'}><img src="img/img4.jpg" alt="watch" className='hover:brightness-50 transition duration-500' /></Link>
        </div>
      </div>
      <div className='flex flex-col xs:justify-center gap-4 xs:gap-8 xs:items-center font-manrope my-8 mx-5'>
        <div className='text-3xl font-bold xs:text-4xl md:text-5xl'>Store in the world</div>
        <div className='flex flex-col max-w-4xl xs:text-center'>
          <div>Quisque vitae nibh iaculis neque blandit hendrerit euismod.Maecenas sit amet purus eget ipsum elementum
            venenatis. Aenean maximus urna magna, quis rutrum mi semper non. Cras rhoncus elit non arcu hendrerit rhoncus sit
            amet purus eget ipsum.</div>
        </div>
        <div className='flex flex-col xs:flex-row gap-8'>
          <div className='overflow-hidden'><Link to={'/dashboard'}><img src="img/img5.jpg" alt="" className='transition-all duration-500 hover:filter hover:grayscale hover:scale-110' /></Link></div>
          <div className='flex flex-col justify-between gap-8'>
            <div className='overflow-hidden'><Link to={'/dashboard'}><img src="img/img6.jpg" alt="" className='transition-all duration-500 hover:filter hover:grayscale hover:scale-110' /></Link></div>
            <div className='overflow-hidden'><Link to={'/dashboard'}><img src="img/img7.jpg" alt="" className='transition-all duration-500 hover:filter hover:grayscale hover:scale-110' /></Link></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default About
