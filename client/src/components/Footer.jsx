import React from 'react'
import { Logo } from '../assets/images'
import { footerLinks } from '../data'

const Footer = () => {
  return (
    <footer className='bg-white py-10 px-8 font-poppins'>
      <div className='flex justify-between gap-10 items-start flex-wrap max-lg:flex-col'>
        {/* Logo Section */}
        <div className='flex flex-col items-start mb-8'>
          <a href='/'>
            <img src={Logo} width={140} height={40} alt='Lyros Logo' />
          </a>
          <address className='mt-4 text-custom-16 text-steelGray font-400'>

            
            Q-4, A2, 10th Floor, Cyber <br />
            Towers, Hitech City, Hyderabad, <br />
             Telangana, India - 500081  <br />
          </address>
        </div>

        {/* Links Section */}
        <div className='flex flex-wrap gap-20'>
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h5 className='text-custom-16 text-steelGray font-medium mb-3'>
                {section.title}
              </h5>
              <ul className='space-y-7'> 
                {section.links.map((link) => (
                  <li key={link.name} className='mb-2'>
                    {link.name === "SUBSCRIBE" ? (
                      <div className="flex items-center">
                        <input
                          type="email"
                          placeholder="Enter Your Email Address"
                          className="border border-gray-400 p-2 rounded-l-md text-sm"
                        />
                        <button className="bg-black text-white px-4 py-2 rounded-r-md">
                          {link.name}
                        </button>
                      </div>
                    ) : (
                      <a href={link.link} className='hover:text-gray-800'>
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Bottom */}
      <div className='mt-8 text-sm text-gray-600'>
        2024 by Lyros Technologies PVT LTD.
      </div>
    </footer>
  )
}

export default Footer
