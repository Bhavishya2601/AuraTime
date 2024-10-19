import { Link } from 'react-router-dom' 

const Home = () => {
  return (
    <>
    <div>
      Home <br /><br />
      <Link to={'/login'}>Get Started</Link>
    </div>
    </>
  )
}

export default Home
