import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Header from './components/Header'

function App() {

  return (
    <>
    <BrowserRouter>
      <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      {/* <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/dashboard/profile' element={<Profile />} /> */}
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
