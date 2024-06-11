import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Sign.css'
import '../../index.css';
import Nav from '../../components/Navbar/Nav'
import Background from '../../components/Background/Background'
import Footer from '../../components/Footer/Footer';
import axios from 'axios'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function submit(e){
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/signup", { email, password })
        .then(result => {
          console.log(result);
          if (result.data === "alreadyexists") {
            toast.warn("We have sent you the verification link. Please verify your account. If you've lost the link, then you can try again in one hour", {
              position: "bottom-right",
              autoClose: 10000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Bounce,
            });
          } else if (result.data === "sent") {
            toast.success('Please check your email to verify this account', {
              position: "bottom-right",
              autoClose: 10000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Bounce,
              });
          }
        });
    }  catch(e) {
      console.log(e);
    }
  }

  return (
    <>
      <Nav />
      <Background />
      <main className='flex items-center height justify-center animate-in'>
        <section className='h-full w-full max-w-sm flex flex-col p-6 gap-6 items'>
          <div className='space-y-2 mb-2 tracking-wide'>
            <h1 className='gradient-text text-3xl md:text-4xl font-semibold'>Get Started</h1>
            <p className='text-zinc-300 md:text-md font-medium'>Create a new account</p>
          </div>
          <form action="" className='space-y-10'>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <label htmlFor="" className='text-sm font-medium leading-none'>Email</label>
                <input type="email" onChange={(e)=> {setEmail(e.target.value)}} className='flex h-10 w-full rounded-md px-3 py-2 text-sm border-input transition-all bg-zinc-950/70' placeholder='you@example.com' />
              </div>
              <div className='space-y-2'>
                <label htmlFor="" className='text-sm font-medium leading-none'>Password</label>
                <input type="password" onChange={(e)=> {setPassword(e.target.value)}} className='flex h-10 w-full rounded-md px-3 py-2 text-sm border-input transition-all bg-zinc-950/70' placeholder='••••••••' />
              </div>
            </div>
            <div>
              <button type='submit' onClick={submit} className='gradient-button px-4 py-2 justify-center rounded-md whitespace-nowrap text-sm font-medium tracking-wide w-full flex items-center'>Sign Up</button>
            </div>
          </form>
          <p className='text-sm text-zinc-400 tracking-wide font-medium mt-2'>Have an account? <Link to="/sign-in" className='underline text-zinc-300 hover:text-zinc-100'>Sign In Now</Link></p>
          <p className='text-xs text-zinc-500 w-full tracking-wider mt-2'>By continuing, you agree to our Terms of Service and Privacy Policy.</p>
          <ToastContainer />
        </section>
      </main>
    </>
  )
}

export default SignUp
