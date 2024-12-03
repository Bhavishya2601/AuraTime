import React, {useState} from 'react'
import axios from 'axios';
import { RxCross1 } from "react-icons/rx";
import toast from 'react-hot-toast';

const ForgotLogin = ({setForgotShown}) => {
    const [email, setEmail] = useState('')
    const [requesting, setRequesting] = useState(false)

    const handleForgetPass = async (e) =>{
        e.preventDefault()
        setRequesting(true)
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/forgotPassword`, {
                email
            })
            if (response.status === 200){
                toast.success('Check Your Email')
            }
        } catch (err){
            console.log(err.message)
            toast.error('Something Went Wrong')
        } finally {
          setRequesting(false)
        }

    }

    const handleClosePop = () => {
        setForgotShown(false)
    }

    const handleEmailChange=(e)=>{
        setEmail(e.target.value)
    }

  return (
    <div>
      <div id="popup" className={` fixed top-0 left-0 w-full h-full z-1 font-manrope`} style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', transition: 'opacity 0.5s ease, visibility 0.5s ease' }}>
        <div className='relative bg-transparent border-2 border-white text-white mx-auto my-[40%] xs:my-[30%] lg:my-[15%] p-5 border-1 w-[300px] xs:w-[400px] text-center flex flex-col gap-6'>
        <RxCross1 className='absolute text-white text-xl top-1 right-1 cursor-pointer' onClick={handleClosePop} />
          <div className='font-semibold text-xl'>Forgot Password</div>
          <form onSubmit={handleForgetPass} className='flex flex-col gap-3'>
            <input type="email" name="email" value={email} onChange={handleEmailChange} className='border-2 bg-transparent py-1 px-2' placeholder='Enter Your Email' required />
            <input type="submit" className='bg-[#f7f7f733] border-2 border-white text-white py-1 cursor-pointer hover:bg-[#f7f7f743] duration-300 transition-all tracking-wider' value={requesting ? "Submitting..." : "Submit"} />
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotLogin
