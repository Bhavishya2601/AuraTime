import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useUser } from '../context/UserContext'
// import toast, { Toaster } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

import Card from '../components/Card'
import Footer from '../components/Footer'
import BestSeller from '../components/BestSeller'

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";


const Dashboard = ({ watches }) => {
  const navigate = useNavigate()
  const { userData, isLoading } = useUser()
  const itemsPerPage = 12;

  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  
  useEffect(() => {
    window.scrollTo({
        top: 0
    })
  }, [])

  useEffect(() => {
    if (!isLoading) {
      if (Object.entries(userData).length === 0) {
        // navigate('/login')
        alert('redirecting to login')
      }
    }
  }, [userData, isLoading])

  const fetchProducts = async () => {
    try {
      setProducts(watches)
      setLoading(false)
    } catch (err) {
      console.log('Error fetching data')
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [watches])

  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  const totalPages = Math.ceil(products.length / itemsPerPage)
  const indexOfLast = currentPage * itemsPerPage
  const indexOfFirst = indexOfLast - itemsPerPage
  const currentWatches = products.slice(indexOfFirst, indexOfLast)


  return (
    <div>
      <div className='relative bg-[url("/img/bg8.jpg")] bg-center h-[50vh]'>
        <div className='absolute text-white flex justify-center items-center h-full w-full text-5xl font-bold font-manrope'>Products</div>
      </div>

      <BestSeller title="TRENDING TODAY" />

      <hr className='h-[2px] bg-slate-200 mx-20' />

      <div className='flex flex-wrap gap-7 py-10 px-20'>
        {currentWatches.map((watch) => {
          return <Card props={watch} key={watch.id} />
        })}
      </div>

      <div className='flex justify-center gap-3 my-5 text-white'>
        <button onClick={() => paginate(currentPage - 1)} className={`${currentPage === 1 ? 'hidden' : ''} group p-2 border-2 bg-white hover:bg-[#cbba9c] transition-all duration-200`}>
          <IoIosArrowBack className='text-2xl text-black group-hover:text-white' />
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            className={`${currentPage === index + 1 ? 'text-white border-[#cbba9c] bg-[#cbba9c]' : ''} text-lg border-2 text-black hover:text-white hover:border-[#cbba9c] hover:bg-[#cbba9c] py-2 px-4 transition-all duration-200`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>)
        )}
        <button onClick={() => paginate(currentPage + 1)} className={`${currentPage === totalPages ? 'hidden' : ''} group p-2 border-2  bg-white hover:bg-[#cbba9c] transition-all duration-200`}>
          <IoIosArrowForward className='text-2xl text-black group-hover:text-white' />
        </button>
      </div>

      <Footer />
    </div>
  )
}

export default Dashboard
