import React, { useState, useRef, useEffect } from 'react'
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
import config from '../../../config.json'
import UserAuth from '../../components/UserAuth/UserAuth'

const Chat = () => {
    UserAuth();

    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    const [sent, setSent] = useState(false);
    const formRef = useRef(null);
    const messagesEndRef = useRef(null);
    const [copied, setCopied] = useState(false);
    const [copyindex, setCopyIndex] = useState(-1);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const getReply = async () => {
        try{
            setLoading(true);
            const token = localStorage.getItem('token');
            console.log(token);
            await axios.post(`${config.url}/response`, {prompt, token})
            .then(result => {

              if (result.data === "error"){
                setMessages((prevMessages) => [...prevMessages, "Error: Unable to connect to server, Please try again!"]);
                setLoading(false);
              } 
              
              else {
                let reply = result.data.response;
                //console.log(reply)
                //reply = reply.replace(/\n/g, '\n\n');
                //console.log(reply)
                setMessages((prevMessages) => [...prevMessages, reply]);
                setLoading(false);
              }
            });

          } catch(e) {
            console.log(e);
            setMessages((prevMessages) => [...prevMessages, "Error: Unable to connect to server, Please try again!"]);
            setLoading(false);
          }
    }

    const components = {
        code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
                <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                >
                    {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
            ) : (
                <code className={className} {...props}>
                    {children}
                </code>
            );
        }
    };

    const copyText = async (text, index) => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setCopyIndex(index);
        setTimeout(() => {
            setCopied(false);
            setCopyIndex(-1);
        }, 2000)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPrompt('');
        setSent(true);
        setMessages((prevMessages) => [...prevMessages, prompt]);
        await getReply();
        //bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
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
                                <div className='animate-in relative max-w-[95%] md:max-w-[85%] border border-zinc-800 rounded-lg p-3 transition-all ml-auto bg-transparent'>
                                    <div className='space-y-1.5' style={{ whiteSpace: 'pre-wrap' }}>
                                        {/* <p className='text-sm md:text-base'>{message}</p> */}
                                        {message.split('\n').map((line, index) => (
                                            <p key={index} className='text-sm md:text-base'>{line}</p>
                                        ))}
                                    </div>
                                </div>
                                {/* this one is the reply */}
                                <div className='animate-in relative max-w-[95%] md:max-w-[85%] border border-zinc-800 rounded-lg p-3 transition-all mr-auto bg-zinc-900'>
                                    <div className='space-y-1.5 message-container'>
                                        {/* <p className='text-sm md:text-base'>{messages[index + 1]}</p> */}
                                        <div className='text-sm md:text-base'>
                                            {loading && index === messages.length - 1 ? 
                                                (
                                                <div className='spin'>
                                                    <i className="ri-loader-fill"></i>
                                                </div>) : 
                                                (<div className=''><ReactMarkdown
                                                    components={components}
                                                    remarkPlugins={[remarkGfm]}
                                                >
                                                    {messages[index + 1]}
                                                </ReactMarkdown></div>)}
                                        </div>
                                        <div ref={messagesEndRef} />
                                    </div>
                                </div>
                                <button className='animate-in cursor-pointer p-1.5 flex items-center w-fit transition -mt-2' onClick={() => copyText(messages[index + 1], index)}>
                                    {copied && index === copyindex ?
                                        (<i class="ri-check-fill text-copi"></i>) :
                                        (<i className="ri-file-copy-line text-copi"></i>)
                                    }
                                    <span className='text-xs md:text-sm ml-1.5 text-copi'>Copy</span>
                                </button>
                            </React.Fragment>
                        )
                    ))}
                </section>
            </div>
            ) : (
            <section className='animate-in w-full flex flex-1 flex-col p-4 pb-24 '>
                <div className='flex-1 flex flex-col items-center justify-center'>
                    <img src="logooo.png" alt="Logo" width={80} height={80} />
                    <h2 className='gradient-text text-center text-2xl md:text-4xl font-semibold'>How can I help you today?</h2>
                </div>
                <div className='animate-in w-full grid grid-cols-1 md:grid-cols-2 p-2 gap-3 md:gap-5'>
                    <div className='rounded-lg relative flex flex-col gap-4 shadow-lg border border-zinc-800 transition-all duration-300 hover:border-zinc-500 bg-cover overflow-hidden col-span-1 p-0 bg-transparant' onClick={() => setPrompt('Make me an discord bot, That replies with "pong" when someone says ping.')}>
                        <div className='flex cursor-pointer items-center justify-between p-4'>
                            <div className='space-y-1.5'>
                                <p className='text-sm font-medium'>Make me a Discord Bot</p>
                                <p className='text-xs text-zinc-400'>That replies "pong" when someone says ping</p>
                            </div>
                        </div>
                    </div>
                    <div className='rounded-lg relative flex flex-col gap-4 shadow-lg border border-zinc-800 transition-all duration-300 hover:border-zinc-500 bg-cover overflow-hidden col-span-1 p-0 bg-transparant' onClick={() => setPrompt('Write a text message asking an friend to come on a trip in an aggressive tone.')}>
                        <div className='flex cursor-pointer items-center justify-between p-4'>
                            <div className='space-y-1.5'>
                                <p className='text-sm font-medium'>Write a text message</p>
                                <p className='text-xs text-zinc-400'>Asking a friend to come on a friends trip</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>)
            }

            <section className='animate-in bg-zinc-950 fixed bottom-0 inset-x-0'>
                <form ref={formRef} onSubmit={handleSubmit} action="" className='mx-auto max-w-4xl w-full p-3 md:p-4'>
                    <div className='relative w-full'>
                        <textarea className='flex border border-zinc-700 w-full max-h-[230px] p-4 pr-12 text-sm bg-transparent rounded-xl resize-none transition-all custom-textarea disabled:cursor-not-allowed disabled:opacity-50' name="prompt" onKeyDown={(e) => {if (e.key === 'Enter' && e.shiftKey === false){e.preventDefault; handleSubmit(e);}}} id="prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)} rows="1" placeholder='Ask anything...'></textarea>
                        <button type='submit' className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium disabled:pointer-events-none disabled:opacity-50 bg-white h-9 w-9 absolute bottom-2 right-2 transition text-black cursor-pointer hover:bg-gray-300'>
                            <i className="ri-arrow-up-line h-5 w-4 text-black"></i>
                        </button>
                    </div>
                </form>
            </section>
        </main>
        <ToastContainer />
    </>
  )
}

export default Chat
