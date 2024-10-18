import { Link } from 'react-router-dom'

import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
    <div>
      Home <br /><br />
      <Link to={'/login'}>Get Started</Link>
    </div>
    <Footer />
    </>
  )
}

export default Home
