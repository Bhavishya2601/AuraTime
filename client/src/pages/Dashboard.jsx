import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useUser } from '../context/UserContext'
// import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import Card from '../components/Card'
import Footer from '../components/Footer'
import leftArrow from '../assets/leftArrow.svg'
import rightArrow from '../assets/rightArrow.svg'

const Dashboard = () => {
  const navigate = useNavigate()
  const { userData, setUserData } = useUser()
  const itemsPerPage = 12;

  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(()=>{
    if (Object.entries(userData).length === 0){
      navigate('/login')
    }
  }, [userData])

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_WATCH_API}/api/v1/watch`)
      setProducts(response.data)
      setLoading(false)
    } catch (err) {
      console.log('Error fetching data')
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  const totalPages = Math.ceil(products.length / itemsPerPage)
  const indexOfLast = currentPage * itemsPerPage
  const indexOfFirst = indexOfLast - itemsPerPage
  const currentWatches = products.slice(indexOfFirst, indexOfLast)


  return (
    <div>
      <div className='bg-[url("https://fleir-store-demo.myshopify.com/cdn/shop/files/about-heading.png?v=1663060570")] bg-cover h-[300px]'>

      </div>

      <div className='flex flex-wrap gap-7 py-10 px-20'>
        {currentWatches.map((watch) => {
          return <Card props={watch} key={watch.id} />
        })}
      </div>

      <div className='flex justify-center gap-3 my-5 text-white'>
        <button onClick={()=>paginate(currentPage-1)} className={`${currentPage === 1 ? 'hidden' : ''} group p-2 border-2 bg-white hover:bg-[#cbba9c] transition-all duration-200`}>
          <img src={leftArrow} alt="prev" className='h-7 group-hover:invert' />
        </button>
        {[...Array(totalPages)].map((_, index)=>(
          <button
          key = {index+1}
          className={`${currentPage === index+1 ? 'text-white border-[#cbba9c] bg-[#cbba9c]' : ''} text-lg border-2 text-black hover:text-white hover:border-[#cbba9c] hover:bg-[#cbba9c] py-2 px-4 transition-all duration-200`}
          onClick={()=>paginate(index+1)}
          >
            {index+1}
          </button>)
       )}
        <button onClick={()=>paginate(currentPage+1)} className={`${currentPage === totalPages ? 'hidden' : ''} group p-2 border-2  bg-white hover:bg-[#cbba9c] transition-all duration-200`}>
        <img src={rightArrow} alt="next" className='h-7 group-hover:invert' />
        </button>
      </div>

      <Footer />
    </div>
  )
}

export default Dashboard
