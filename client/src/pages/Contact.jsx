import React, { useState } from 'react'
import emailjs from 'emailjs-com'
import toast from 'react-hot-toast'

import Footer from '../components/Footer';

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      formData,
      import.meta.env.VITE_EMAILJS_USER_ID
    ).then((response) => {
      console.log("Success!", response.status, response.text)
      toast.success('Message Sent Succesfully')
      setFormData({
        name: '',
        email: '',
        message: ''
      })
      setIsSubmitting(false)
    }, (error) => {
      console.log('FAILED!', error)
      toast.error("Failed to send message. Please try again later.")
      setIsSubmitting(false)
    })
  }

  return (
    <>
      <div className='relative bg-[url("/img/bg8.jpg")] bg-center h-[50vh]'>
        <div className='absolute text-white flex justify-center items-center h-full w-full text-5xl font-bold font-manrope'>Contact Us</div>
      </div>

      <div className='mx-5 xxs:mx-10 lg:mx-20 xl:mx-40 my-20 flex md:flex-row flex-col min-h-[100vh]'>
        <div className='w-full md:w-1/2 bg-[#f7f7f7] font-manrope p-5 xxs:p-10 lg:p-20 flex flex-col gap-16'>
          <div className='flex flex-col gap-8'>
            <div className='font-semibold text-lg tracking-widest'>CONTACT INFORMATION</div>
            <hr className='w-1/3 h-[1.5px] bg-[#CBBA9C]' />
            <div className='text-gray-500'>We do not sell product from our corporate headquarters. If you want to visit, please reach out to our customer service team first.</div>
            <div className='text-gray-500'>1201 Broadway<br />Suite 600</div>
          </div>
          <div className='xxs:text-lg lg:text-2xl underline font-bold'><a href="mailto:bhavishyagarg2601@gmail.com">bhavishyagarg2601@gmail.com</a></div>
          <div className="flex flex-col gap-4">
            <div className='font-bold tracking-wider
            '>FOLLOW US</div>
            <hr className='w-[15%] h-[1.5px] bg-[#CBBA9C]' />
            <div className='flex gap-5'>
              <a href='https://www.linkedin.com/in/bhavishya2601/' target='_blank' className='p-2 rounded-full border-2 border-slate-800'>
                <FaLinkedin className='text-2xl' />
              </a>
              <a href='https://www.github.com/bhavishya2601/' target='_blank' className='p-2 rounded-full border-2 border-slate-800'>
                <FaGithub className='text-2xl' />
              </a>
              <a href='https://www.x.com/bhavishya2601/' target='_blank' className='p-2 rounded-full border-2 border-slate-800'>
                <FaXTwitter className='text-2xl' />
              </a>
            </div>
          </div>
        </div>
        <div className='min-h-full w-full md:w-1/2'>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3437.174971799988!2d76.65720287502891!3d30.5160910960714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fc32344a6e2d7%3A0x81b346dee91799ca!2sChitkara%20University!5e0!3m2!1sen!2sin!4v1730291514085!5m2!1sen!2sin" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className='h-full min-h-72 w-full'></iframe>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className='py-10 px-5 md:px-20 lg:px-40 font-manrope flex flex-col gap-6'>
          <div className='font-semibold text-3xl tracking-wider text-center'>CONTACT FORM</div>
          <hr className='w-1/12 h-[1.5px] bg-[#CBBA9C] mx-auto ' />

          <div className='flex xs:flex-row flex-col gap-5'>
            <input
              type="text"
              name='name'
              className='w-full xs:w-1/2 px-3 py-2 outline-none border-2'
              placeholder='Your Name'
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name='email'
              className='w-full xs:w-1/2 px-3 py-2 outline-none border-2'
              placeholder='Your Email'
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <textarea
            name="message"
            className='resize-none border-2 outline-none h-60 py-2 px-3'
            placeholder='Your Message'
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          <input
            type="submit"
            className='border-2 bg-black text-white py-2 w-2/3 xxs:w-1/3 md:w-2/12 mx-auto cursor-pointer'
            value={isSubmitting ? "Sending..." : 'Submit'}
            disabled={isSubmitting}
          />
        </div>
      </form>
      <Footer />
    </>
  )
}

export default Contact
