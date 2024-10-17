import { Link } from 'react-router-dom'

import SignUp from './SignUp'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
    <div>
      Home <br /><br />
      <Link to={'/signup'}>Get Started</Link>
    </div>
    <Footer />
    </>
  )
}

export default Home
