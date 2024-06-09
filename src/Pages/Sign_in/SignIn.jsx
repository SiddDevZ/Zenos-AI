import React from 'react'
import { Link } from 'react-router-dom';
import './Sign.css'
import '../../index.css';
import Nav from '../../components/Navbar/Nav'
import Background from '../../components/Background/Background'
import Footer from '../../components/Footer/Footer';

const SignIn = () => {
  return (
    <>
      <Nav />
      <Background />
      <main className='flex items-center height justify-center animate-in'>
        <section className='h-full w-full max-w-sm flex flex-col p-6 gap-6 items'>
          <div className='space-y-2 mb-2 tracking-wide'>
            <h1 className='gradient-text text-3xl md:text-4xl font-semibold'>Welcome back</h1>
            <p className='text-zinc-300 md:text-md font-medium'>Sign in to your account</p>
          </div>
          <form action="" className='space-y-10'>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <label htmlFor="" className='text-sm font-medium leading-none'>Email</label>
                <input type="text" className='flex h-10 w-full rounded-md px-3 py-2 text-sm border-input transition-all bg-zinc-950/70' placeholder='you@example.com' />
              </div>
              <div className='space-y-2'>
                <label htmlFor="" className='text-sm font-medium leading-none'>Password</label>
                <input type="password" className='flex h-10 w-full rounded-md px-3 py-2 text-sm border-input transition-all bg-zinc-950/70' placeholder='••••••••' />
              </div>
            </div>
            <div>
              <button className='gradient-button px-4 py-2 justify-center rounded-md whitespace-nowrap text-sm font-medium tracking-wide w-full flex items-center'>Sign In</button>
            </div>
          </form>
          <p className='text-sm text-zinc-400 tracking-wide font-medium mt-2'>Don't have an account? <Link to="/sign-up" className='underline text-zinc-300 hover:text-zinc-100'>Sign Up Now</Link></p>
          <p className='text-xs text-zinc-500 w-full tracking-wider mt-2'>By continuing, you agree to our Terms of Service and Privacy Policy.</p>
        </section>
      </main>
    </>
  )
}

export default SignIn
