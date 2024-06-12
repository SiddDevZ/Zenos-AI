import React from 'react'
import './Nav.css'
import { Link } from 'react-router-dom';
import config from '../../../config.json'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Nav = () => {

  return (
    <nav className='fixed-nav max-w-[1440px] h-20 px-4 sm:px-20 md:px-24 lg:px-28 flex items-center justify-between animate-in'>
        <Link className='cursor-pointer font-pop text-btn transition-all duration-300 hover:scale-105' to="/">{config.name}</Link>
        <div>
            <Link className='inline-flex items-center justify-center whitespace-nowrap text-md font-medium text-btn transition-all duration-300 hover:scale-105 tspace' to="/sign-in">Login</Link>
        </div>
    </nav>
  )
}

export default Nav
