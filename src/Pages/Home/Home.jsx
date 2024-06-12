import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import '../../index.css';
import './Home.css'
import Nav from '../../components/Navbar/HomeNav'
import AnimatedButton from '../../components/Animated-button/Button'
import Background from '../../components/Background/Background'
import Footer from '../../components/Footer/Footer';
import config from '../../../config.json'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [glowStyle, setGlowStyle] = useState({});

  const handleMouseMove = (e) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    setGlowStyle({
      left: `${x}px`,
      top: `${y}px`,
      transform: `translate(-50%, -50%)`,
      display: 'block'
    });
  };

  const handleMouseLeave = () => {
    setGlowStyle({ display: 'none' });
  };

  const handleMouseEnter = () => {
    setGlowStyle({ display: 'block' });
  };

  return (
    <>
      <Background />
      <Nav />

      <section className='flex flex-col items-center justify-center p-4 py-24 mt-16'>
        <AnimatedButton />
        <h1 className='my-3 text-[2.5rem] md:text-5xl lg:text-6xl xl:text-7xl md:leading-[3.8rem] lg:leading-[4.8rem] text-center font-semibold tracking-wide gradient-text animate-in'>AI-Driven Chat, Redefined</h1>
        <p className='my-3 gradient-text md:text-lg tracking-wide max-w-2xl text-center animate-in'>Experience Seamless, Intelligent Conversations Like Never Before with {config.name}'s Cutting-Edge Language Model Technology</p>
        <div className='w-full flex items-center justify-center gap-4 mt-4 animate-in'>
            <Link className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium px-[1.20rem] py-3 gradient-button' to="/chat">Get Started</Link>
            <a className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium px-[1.25rem] py-3 bg-github git-button' href="https://github.com/SiddDevZ/Candlyn-AI" target="_blank"><i className="ri-github-line mr-2 h-4 w-4"></i><span>GitHub</span></a>
        </div>
      </section>

      <section className='animate-in w-full'>
        <div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter} className='glow-container rounded-lg overflow-hidden mx-auto w-fit border border-zinc-900 max-w-[85%] group'>
            <div className='glow' style={glowStyle}></div>
            <img  src="https://i.imgur.com/tCsbnKt.png" alt="" width={1000} height={500}/>
        </div>
      </section>

      <Footer />
      <ToastContainer />
    </>
  )
}

export default Home
