import React from 'react'
import { Link } from 'react-router-dom'
import linkedin from '../assets/linkedin.svg'
import arrow from '../assets/arrow.svg'
import instagram from '../assets/instagram.svg'
import mail from '../assets/mail.svg'
import x from '../assets/x.svg'
import youtube from '../assets/youtube.svg'
import location from '../assets/location.svg'
import whatsapp from '../assets/whatsapp.svg'

const Footer = () => {
  return (
    <div className='clip-tilted-footer bg-slate-900 absolute bottom-0 min-h-[300px] w-full'>
      <div className='mt-24 px-48 text-gray-400 flex flex-col gap-10 py-10'>
        <div className='flex justify-between'>
          <div className='text-xl'>
            logo
          </div>
          <div className='flex gap-3 items-center'>
            <div>
              <a href="https://www.linkedin.com/in/bhavishya2601" target='_blank' >
                <img src={linkedin} alt="linkedin" className="h-6 w-6 " />
              </a>
            </div>
            <div>
              <a href="https://x.com/bhavishya2601" target='_blank'>
                <img src={x} alt="x" className="h-5 w-5" />
              </a>
            </div>
            <div>
              <a href="#">
                <img src={youtube} alt="youtube" className="h-6 w-6" />
              </a>
            </div>
            <div>
              <a href="mailto:project.bhavishya2601@gmail.com">
                <img src={mail} alt="Email" className="h-6 w-6" />
              </a>
            </div>
            <div>
              <a href="#">
                <img src={instagram} alt="Instagram" className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <div className="text-white font-bold text-[22px]">Quick Links</div>
            <div className="flex flex-col gap-2 text-[17px]">
              <div className='flex gap-1 items-center'>
                <img src={arrow} className="h-4" />
                <Link to={'/'}>Home</Link>
              </div>
              <div className='flex gap-1 items-center'>
                <img src={arrow} className="h-4" />
                <Link to={'/about'}>About</Link>
              </div>
              <div className='flex gap-1 items-center'>
                <img src={arrow} className="h-4" />
                <Link to={'/contact'}>Contact</Link>
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-3">
              <div className="text-[22px] font-bold text-white">Contact us</div>
              <div className="flex flex-col gap-3 text-[17px]">
                <div className='flex gap-1 items-center'>
                  <img src={whatsapp} className="h-6" />
                  <div>+91 9999999999</div>
                </div>
                <div className='flex gap-2 items-center'>
                  <img src={location} className="h-6" />
                  <div>Chitkara University, Punjab</div>
                </div>
                <div className='flex gap-3 items-center'>
                  <img src={mail} className="h-5" />
                  <div>bhavishyagarg2601@gmail.com</div>
                </div>
              </div>
            </div>
          </div>
          <div>
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
        <div className="flex justify-between">
          <div>&copy; {new Date().getFullYear()} copyright. All rights reserved.</div>
          <div>
            Designed by <a href="https://www.linkedin.com/in/bhavishya2601" target='_blank'>Bhavishya2601</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
