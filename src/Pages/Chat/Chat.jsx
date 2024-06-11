import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../../index.css';
import './Chat.css';
import Nav from '../../components/Navbar/Nav'
import Background from '../../components/Background/Background'
import axios from 'axios'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'remixicon/fonts/remixicon.css'
import { get } from 'mongoose';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Chat = () => {
    const [prompt, setPrompt] = useState('');
    const [reply, setReply] = useState('');
    const [messages, setMessages] = useState([])
    const [sent, setSent] = useState(false);

    const getReply = async () => {
        try{
            await axios.post("http://localhost:3001/response", {prompt})
            .then(result => {

              if (result.data === "error"){
                setReply("Error: Unable to connect to server, Please try again!");
              } 
              
              else {
                const reply = result.data.response;
                console.log(reply)
                setMessages((prevMessages) => [...prevMessages, prompt, reply]);
              }
            });
            
          } catch(e) {
            console.log(e);
          }
    }

    const components = {
        code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
                <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div" {...props}>
                    {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
            ) : (
                <code className={className} {...props}>
                    {children}
                </code>
            );
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSent(true);
        await getReply();
        //setMessages((prevMessages) => [...prevMessages, prompt, reply]);
        setPrompt('');
        //console.log(messages);
    }

  return (
    <>
        <Nav />
        <Background />
        <main className='height flex flex-col w-full max-w-4xl mx-auto'>
        {sent ? (
            <div className='flex flex-col h-max pt-20 w-full rounded-lg px-4 pb-20'>
                <section className='flex flex-col w-full gap-4 p-2'>
                    {messages.map((message, index) => (
                        index % 2 === 0 && (
                            <React.Fragment key={index}>
                                {/* this one is sending */}
                                <div className='relative max-w-[95%] md:max-w-[85%] border border-zinc-800 rounded-lg p-3 transition-all ml-auto bg-transparent'>
                                    <div className='space-y-1.5'>
                                        <p className='text-sm md:text-base'>{message}</p>
                                    </div>
                                </div>
                                {/* this one is the reply */}
                                <div className='relative max-w-[95%] md:max-w-[85%] border border-zinc-800 rounded-lg p-3 transition-all mr-auto bg-zinc-900'>
                                    <div className='space-y-1.5'>
                                        {/* <p className='text-sm md:text-base'>{messages[index + 1]}</p> */}
                                        <div className='text-sm md:text-base'>
                                            <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
                                                {messages[index + 1]}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                </div>
                                <button className='cursor-pointer p-1.5 flex items-center w-fit transition -mt-2'>
                                    <i className="ri-file-copy-line text-copi text-copi"></i>
                                    <span className='text-xs md:text-sm ml-1.5 text-copi'>Copy</span>
                                </button>
                            </React.Fragment>
                        )
                    ))}
                </section>
            </div>
            ) : (
            <section className='w-full flex flex-1 flex-col p-4 pb-24 '>
                <div className='flex-1 flex flex-col items-center justify-center'>
                    {/* <img src="" alt="Logo" width={130} height={130} /> */}
                    <h2 className='gradient-text text-center text-2xl md:text-4xl font-semibold'>How can I help you today?</h2>
                </div>
                <div className='w-full grid grid-cols-1 md:grid-cols-2 p-2 gap-3 md:gap-5'>
                    <div className='rounded-lg relative flex flex-col gap-4 shadow-lg border border-zinc-800 transition-all duration-300 hover:border-zinc-500 bg-cover overflow-hidden col-span-1 p-0 bg-transparant'>
                        <div className='flex cursor-pointer items-center justify-between p-4'>
                            <div className='space-y-1.5'>
                                <p className='text-sm font-medium'>Help me dubug</p>
                                <p className='text-xs font-light text-zinc-400'>a linked list problem in C++.</p>
                            </div>
                        </div>
                    </div>
                    <div className='rounded-lg relative flex flex-col gap-4 shadow-lg border border-zinc-800 transition-all duration-300 hover:border-zinc-500 bg-cover overflow-hidden col-span-1 p-0 bg-transparant'>
                        <div className='flex cursor-pointer items-center justify-between p-4'>
                            <div className='space-y-1.5'>
                                <p className='text-sm font-medium'>Write a text message</p>
                                <p className='text-xs font-light text-zinc-400'>asking a friend to be my plus-one at a wedding.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>)
            }

            <section className='bg-zinc-950 fixed bottom-0 inset-x-0'>
                <form onSubmit={handleSubmit} action="" className='mx-auto max-w-4xl w-full p-3 md:p-4'>
                    <div className='relative w-full'>
                        <textarea className='flex border border-zinc-700 w-full max-h-[230px] p-4 pr-12 text-sm bg-transparent rounded-xl resize-none transition-all custom-textarea disabled:cursor-not-allowed disabled:opacity-50' name="prompt" id="prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)} rows="1" placeholder='Ask anything...'></textarea>
                        <button type='submit' className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium disabled:pointer-events-none disabled:opacity-50 bg-white h-9 w-9 absolute bottom-2 right-2 transition text-black cursor-pointer hover:bg-gray-300'>
                            <i className="ri-arrow-up-line h-5 w-4 text-black"></i>
                        </button>
                    </div>
                </form>
            </section>
        </main>
    </>
  )
}

export default Chat
