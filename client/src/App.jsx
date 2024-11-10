import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserProvider from './context/UserContext'

import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Error_404 from './pages/Error_404'
import { Toaster } from 'react-hot-toast'

import Header from './components/Header'

function App() {

  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Header />
          <Toaster />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='*' element={<Error_404 />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  )
}

export default App
