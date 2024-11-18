import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from './Card'

const BestSeller = (props) => {
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(true)
    const [best, setBest] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_WATCH_API}/api/v1/watch`)
                setProduct(response.data)
                setLoading(false)
            } catch (err) {
                console.log(err.message)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (!loading && product.length > 0) {
            let availableproducts = [...product]
            let bestWatches = []
            for (let i = 0; i < 4; i++) {
                let len = availableproducts.length;
                let index = Math.floor(Math.random() * len)
                bestWatches.push(availableproducts[index])
                availableproducts.splice(index, 1)
            }
            setBest(bestWatches)
        }

    }, [loading, product])

    return (
        <div>
            <div className='bg-[url("/img/bg6.png")] bg-cover text-center pt-20 pb-12 w-full'>
                <div className='font-bold text-5xl font-cinzel'>{props.title}</div>
                <hr className='bg-[#CBBA9C] border-none w-1/12 h-[2px] mx-auto mt-2' />
                <div className='flex flex-wrap gap-7 py-10 px-20'>
                    {best.map((watch, index) => {
                        return <Card props={watch} key={index} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default BestSeller
