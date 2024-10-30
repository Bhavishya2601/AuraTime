import { Link } from 'react-router-dom'
import Card from '../components/Card'
import Blog from '../components/Blog'

import { home_watch, blogs } from '../constants/index'

const Home = () => {
  return (
    <>
      <div className='bg-[url("/img/bg1.jpg")] bg-center h-[calc(100vh-50px)] font-manrope text-[#CBBA9C]'>
        <div className='w-1/2 px-32 flex flex-col gap-4 justify-center h-full'>
          <div className='text-4xl font-extrabold leading-[45px]'>THE WATCH EVERYONE DESIRE</div>
          <div className='text-md'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius inventore soluta obcaecati debitis? Autem, minus!</div>
          <Link to={'/login'}><button className='w-1/3 py-2 border-[#CBBA9C] border-2 font-bold hover:bg-[#CBBA9C] text-white transition-all duration-500'>Get Started</button></Link>
        </div>
      </div>



      <div className='flex h-[80vh] font-manrope'>
        <div className='w-1/2 bg-[url("/img/bg2.jpg")] bg-cover bg-center flex flex-col gap-3 p-20 justify-end opacity-100  hover:opacity-95'>
          <div className='font-black text-4xl text-[#CBBA9C] font-archivo'>TIME</div>
          <div className='text-white text-lg'>Unique Watches from Classic Collections</div>
          <Link to={'/login'}><button className='w-1/5 py-2 border-[#CBBA9C] border-2 font-bold hover:bg-[#CBBA9C] text-white transition-all duration-500'>BUY NOW</button></Link>
        </div>
        <div className='w-1/2'>
          <div className='h-1/2 flex'>
            <div className='w-1/2 bg-[url("/img/bg3.jpg")] bg-center bg-cover opacity-100 hover:opacity-95 flex flex-col gap-3 justify-center items-center'>
              <div className='font-black text-4xl text-[#CBBA9C] font-archivo'>DITRACK</div>
              <div className='text-white text-lg'>Handsome Watches</div>
              <Link to={'/login'} className='w-1/3 py-2 border-[#CBBA9C] border-2 font-bold hover:bg-[#CBBA9C] text-white text-center transition-all duration-500 items-end'><button >BUY NOW</button></Link>
            </div>
            <div className='w-1/2 bg-[url("/img/bg4.png")] bg-center opacity-100 hover:opacity-90 flex flex-col gap-3 justify-center items-center'>
              <div className='font-black text-4xl text-[#CBBA9C] font-archivo'>SANTEX</div>
              <div className='text-white text-lg'>International Brand</div>
              <Link to={'/login'} className='w-1/3 py-2 border-[#CBBA9C] border-2 font-bold hover:bg-[#CBBA9C] text-white text-center transition-all duration-500 items-end'><button>VIEW ALL</button></Link>
            </div>
          </div>
          <div className='bg-[url("/img/bg5.jpg")] h-1/2 w-full bg-center opacity-100 hover:opacity-95 flex flex-col gap-3 p-10 text-right'>
            <div className='font-black text-4xl text-[#CBBA9C] font-archivo'>GIZMO</div>
            <div className='text-white text-lg'>Classic Watch Collections</div>
            <Link to={'/login'}><div className='w-full'><button className='w-1/3 py-2 border-[#CBBA9C] border-2 font-bold hover:bg-[#CBBA9C] text-white transition-all duration-500 items-end'>VIEW COLLECTIONS</button></div></Link> 
          </div>
        </div>
      </div>

      <div className='bg-[url("/img/bg6.png")] bg-cover text-center py-20 w-full'>
        <div className='font-bold text-3xl font-manrope'>BEST SELLER</div>
        <hr className='bg-[#CBBA9C] border-none w-1/12 h-[2px] mx-auto mt-2' />
        <div className='flex flex-wrap gap-7 py-10 px-20'>
          {home_watch.map((watch, index) => {
            return <Card props={watch} key={index} />
          })}
        </div>
      </div>

      <div className='flex h-[70vh]'>
        <div className='w-[42vw] flex flex-col gap-3 bg-[url("/img/img1.png")] bg-no-repeat bg-left-bottom py-32 px-12 pl-32 bg-[#dadcde]'>
          <div className='font-extrabold font-manrope text-4xl'>Professional and Luxury watches for everyone</div>
          <div>Time's influence extends beyond individual lives. It shapes the evolution of societies, cultures, and civilizations. It allows for progress, learning from the past, and envisioning a better future.</div>
          <Link to={'/login'} ><div className='flex gap-3 items-center'><img src="/img/left-arrow.svg" alt="arrow" className='h-5' />View All Categories</div></Link>
        </div>
        <div className='w-[58vw] bg-[url("/img/bg7.png")] flex gap-2 py-32 px-20 justify-end items-center'>
          <div>
            <Link to={'/login'} ><div className='bg-[#dadcde] p-3 rounded-full'>
              <img src="/img/right-up-arrow.svg" alt="arrow" className='h-10' />
            </div></Link>
          </div>
          <div className='text-white font-manrope w-1/2 flex flex-col gap-4'>
            <div>Casio</div>
            <div className='text-3xl font-extrabold'>Anthracite Dial Men's Watch</div>
            <div className='font-medium'>Type: Watch</div>
            <div className='font-semibold text-lg'>$79.00</div>
          </div>
        </div>
      </div>

      <div className='flex h-[60vh]'>
        <div className='w-[45vw] bg-[url("/img/bg4.png")] bg-center bg-cover py-32 px-20 pl-32 text-white flex justify-end'>
          <div className='flex flex-col gap-3 w-1/2'>
            <div className='text-gray-400'>Longines</div>
            <div className='text-3xl font-extrabold'>La Classique De Longines</div>
            <div className='font-medium text-gray-400'>Type: Watch</div>
            <div className='font-semibold text-lg'>$180.00</div>
          </div>
        </div>
        <div className='w-[55vw] flex bg-[url("/img/img3.webp")] bg-no-repeat bg-right-top bg-[#dadcde] px-8'>
          <div className='w-1/2 py-10 flex flex-col gap-3'>
            <div className='text-4xl font-extrabold'>The best dietary catering for your weight.</div>
            <div className='text-gray-500'>A dietary description typically refers to providing information about the specific dietary requirements or preferences of a dish, menu, or food product.</div>
            <Link to={'/login'}><button className='w-1/3 py-2 border-2 bg-[#777777] text-white font-bold hover:bg-transparent hover:text-black hover:border-black transition-all duration-500'>Show More</button></Link>
          </div>
          <img src="/img/img2.webp" alt="watch" />
        </div>
      </div>

      <div className='flex flex-col gap-2 px-16 py-16'>
        <div className='font-bold text-3xl font-manrope text-center'>OUR BLOGS</div>
        <hr className='bg-[#CBBA9C] border-none w-1/12 h-[2px] mx-auto mb-2' />
        <div className='flex flex-wrap gap-6'>
          {blogs.map((blog, index) => {
            return <Blog key={index} props={blog} />
          })}
        </div>
      </div>
    </>
  )
}

export default Home
