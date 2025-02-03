import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaInfoCircle, FaPhone, FaUserCircle, FaHeart, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa'
import { IoTicket } from 'react-icons/io5'
import { MdClose, MdDashboard, MdPayment } from 'react-icons/md'
import { FaCalendar } from 'react-icons/fa'

import GreenButton from '../Buttons/GreenButton'

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const FaUserCircleOnClick = () => {
    handleDropdown()
  }

  const user = {
    name: "Nawa",
    role: "Admin",
    balance: 1000
  }

  const pages = [
    {
      name: "İletişim",
      icon: <FaPhone />,
      path: "/contact",
    },
    {
      name: "Biletler",
      icon: <IoTicket />,
      path: "/tickets",
    },
    {
      name: "Hakkımızda",
      icon: <FaInfoCircle />,
      path: "/about",
    }
  ]

  //balance
  //tickets
  //events
  //logout
  //profile
  const dropdownItems = [
    { name: 'Bakiye Yükle', icon: <MdPayment />, path: '/balance' },
    { name: 'Biletlerim', icon: <IoTicket />, path: '/tickets' },
    //{ name: 'Etkinliklerim', icon: <FaCalendar />, path: '/events' },
    { name: 'Profilim', icon: <FaUserCircle />, path: '/profile' },
    { name: 'Çıkış', icon: <FaSignOutAlt />, path: '/logout' }
  ]

  return (
    <header className='h-12 w-full bg-slate-800 flex items-center justify-between rounded-b-2xl px-4 absolute'>
      <Link to="/" className='w-48'>
        <div className='flex items-center'>
          <img src={"https://cdn.discordapp.com/attachments/1250451346667081758/1336003221092565053/cresca-logo.png?ex=67a23975&is=67a0e7f5&hm=e1d9d6b502a1689203830e40f473d1baf9de17f8437f79dfd185a9f6d66edbcc&"} alt="logo" />
        </div>
      </Link>

      <div className='flex-1 flex items-center justify-center'>
        <div className='flex items-center text-white gap-6'>
          {pages.map((page) => (
            <Link to={page.path} key={page.name}>
              <div className='flex items-center justify-center space-x-2 hover:border hover:border-primary hover:rounded-2xl py-1 px-2 transition border-primary'>
                {page.icon}
                <span>{page.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className='w-48 flex items-center justify-end relative'>
        {user ? (
          <div className='flex items-center justify-center gap-2 text-primary cursor-pointer' onClick={FaUserCircleOnClick}>
            {isDropdownOpen ? <MdClose className='text-2xl' /> : <FaUserCircle className='text-2xl' />}
          </div>
        ) : (
          <GreenButton>
            Giriş Yap
          </GreenButton>
        )}

        {isDropdownOpen && (
          <div className='absolute top-12 right-0 w-64 rounded-lg bg-slate-800 shadow-lg p-4 z-50'>
            <div className='flex flex-col gap-2'>
              <div className='flex items-center gap-2 p-3 border-b border-slate-700'>
                <FaUserCircle className='text-2xl text-primary' />
                <div className='flex flex-col'>
                  <span className='text-white font-medium'>{user.name}</span>
                  <span className='text-primary'>{user.balance} ₺</span>
                </div>
              </div>
              
              {dropdownItems.map((item, index) => (
                <Link 
                  key={index} 
                  to={item.path} 
                  className='flex items-center gap-2 p-3 text-white hover:bg-slate-700 rounded-lg transition'
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header