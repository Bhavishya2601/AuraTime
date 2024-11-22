import React, { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';

import UserProvider from './context/UserContext';
import Header from './components/Header';
import Loading from './components/Loading'
import CartSlider from './components/CartSlider';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const Product = lazy(() => import('./pages/Product'));
const Error_404 = lazy(() => import('./pages/Error_404'));
const CheckOut = lazy(() => import('./pages/CheckOut'))

function App() {
  const [cart, setCart] = useState(false)
  const [cartProduct, setCartProduct] = useState([])
  const [watches, setWatches] = useState([])
  
  const toggleCart = () =>{
    setCart(prev => !prev)
  }
  
  const updatedCartProduct = (updatedCart) => {
    setCartProduct(updatedCart)
  }

  useEffect(()=>{
    const fetchWatches = async () => {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/watch`)
      setWatches(response.data)
    }

    fetchWatches()
  }, [])

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
              <Route path='/dashboard' element={<Dashboard watches={watches}/>} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/checkout' element={<CheckOut cartProduct={cartProduct} />} />
              <Route path='/product' element={<Product toggleCart={toggleCart} updatedCartProduct={updatedCartProduct}/>} />
              <Route path='*' element={<Error_404 />} />
            </Routes>
          </Suspense>

          <CartSlider data={{cart, setCart, cartProduct, watches}}/>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
