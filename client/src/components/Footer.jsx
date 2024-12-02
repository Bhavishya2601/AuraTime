import React from 'react'
import { Link } from 'react-router-dom'

import { FaWhatsapp, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaLocationDot, FaXTwitter } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import { IoLogoYoutube, IoMdArrowDropright } from "react-icons/io";

const Footer = () => {
  return (
    <div className='bg-black min-h-[300px] w-full'>
      <div className='pt-5 xs:pt-12 px-5 sm:px-16 xl:px-48 text-gray-400 flex flex-col gap-10 py-10'>
        <div className='flex items-center gap-5 justify-between'>
          <div className='text-xl'>
            <img src="logo1.png" alt="AuraTime" className='h-10' />
          </div>
          <div className='flex gap-3 items-center text-xl xxs:text-2xl'>
            <div>
              <a href="https://www.linkedin.com/in/bhavishya2601" target='_blank' >
                <FaLinkedin className='text-[rgba(107,114,128,1)]' />
              </a>
            </div>
            <div>
              <a href="https://x.com/bhavishya2601" target='_blank'>
                <FaXTwitter className='text-[rgba(107,114,128,1)] ' />
              </a>
            </div>
            <div className='hidden xxs:block'>
              <a href="#">
                <IoLogoYoutube className='text-[rgba(107,114,128,1)]' />
              </a>
            </div>
            <div>
              <a href="mailto:project.bhavishya2601@gmail.com">
                <SiGmail className='text-[rgba(107,114,128,1)]' />
              </a>
            </div>
            <div className='hidden xxs:block'>
              <a href="#">
                <FaInstagram className='text-[rgba(107,114,128,1)] ' />
              </a>
            </div>
          </div>
        </div>
        <div className="flex justify-between flex-col gap-10 lg:flex-row">
          <div className='flex gap-5 xs:justify-evenly lg:justify-between w-full lg:w-1/2'>
            <div className=" xs:flex-col gap-2 hidden xs:flex">
              <div className="text-white font-bold text-[22px]">Quick Links</div>
              <div className="flex flex-col gap-2 text-[17px]">
                <div className='flex gap-1 items-center'>
                  <IoMdArrowDropright className='text-[rgba(107,114,128,1)] text-2xl' />
                  <Link to={'/'}>Home</Link>
                </div>
                <div className='flex gap-1 items-center'>
                  <IoMdArrowDropright className='text-[rgba(107,114,128,1)] text-2xl' />
                  <Link to={'/about'}>About</Link>
                </div>
                <div className='flex gap-1 items-center'>
                  <IoMdArrowDropright className='text-[rgba(107,114,128,1)] text-2xl' />
                  <Link to={'/contact'}>Contact</Link>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-[22px] font-bold text-white">Contact us</div>
              <div className="flex flex-col gap-3 text-[17px]">
                <div className='flex gap-1 items-center'>
                  <FaWhatsapp className='text-[rgba(107,114,128,1)] text-2xl' />
                  <div>+91 7347*****3</div>
                </div>
                <div className='flex gap-2 items-center'>
                  <FaLocationDot className='text-[rgba(107,114,128,1)] text-xl' />
                  <div>Chitkara University, Punjab</div>
                </div>
                <div className='flex gap-3 items-center'>
                  <SiGmail className='text-[rgba(107,114,128,1)] text-xl' />
                  <div>bhavishyagarg2601@gmail.com</div>
                </div>
              </div>
            </div>
          </div>
          <div className='items-center xxs:flex justify-center hidden'>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3437.174971799996!2d76.65720287502891!3d30.5160910960714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fc32344a6e2d7%3A0x81b346dee91799ca!2sChitkara%20University!5e0!3m2!1sen!2sin!4v1729102642134!5m2!1sen!2sin"
              width="400"
              height="200"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center sm:flex-row sm:justify-between">
          <div>&copy; {new Date().getFullYear()} copyright. All rights reserved.</div>
          <div>
            Designed by <a href="https://www.linkedin.com/in/bhavishya2601" target='_blank' className='font-bold text-white'>Bhavishya Garg</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
