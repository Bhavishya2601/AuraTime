import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserProvider from './context/UserContext';

import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Loading from './components/Loading'

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const Error_404 = lazy(() => import('./pages/Error_404'));

function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Header />
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
              <Route path='*' element={<Error_404 />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
