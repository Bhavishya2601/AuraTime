import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { RxCross1 } from "react-icons/rx";

import UserProvider from './context/UserContext';
import Header from './components/Header';
import Loading from './components/Loading'

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const Product = lazy(() => import('./pages/Product'));
const Error_404 = lazy(() => import('./pages/Error_404'));

function App() {
  const [cart, setCart] = useState(false)

  const toggleCart = () =>{
    setCart(prev => !prev)
  }
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Header toggleCart={toggleCart}/>
          <Toaster />
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/product' element={<Product />} />
              <Route path='*' element={<Error_404 />} />
            </Routes>
          </Suspense>

          <div className={`top-0 right-0 h-full w-[30%] bg-white fixed duration-500 transition-transform z-20 ${cart ? 'translate-x-0' : 'translate-x-full'}`}>
            <div><RxCross1 onClick={()=>setCart(false)} className='absolute top-4 right-4 text-xl font-bold cursor-pointer'/></div>
            <div className='font-manrope text-xl flex justify-center items-center font-bold h-12'>
              Shopping Cart
            </div>
            <hr className='border-black'/>
            <div className='flex flex-col justify-center gap-5 items-center h-[calc(100vh-100px)]'>
              <div className=' font-semibold text-3xl'>Your Cart is empty</div>
              <div  className='bg-black text-white px-7 py-3 font-bold uppercase tracking-widest cursor-pointer'>Go to Shop</div>
            </div>
          </div>

          {cart && (
            <div 
              className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-60 z-10"
              onClick={() => setCart(false)}
            />
          )}

        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
