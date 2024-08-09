import React from 'react'
import { VscSend } from "react-icons/vsc";
import { useState, useEffect, useRef } from 'react';

const Home = () => {

    const [mes, setmes] = useState("");
    const [message, setmessage] = useState([
        { message: "This is a received message...", right: 73, color: "#c5e9ae", ml: 68 },
        { message: "This is a sent message...", right: 1.5, color: "#aff9fe", ml: 5 }
    ]);
    const messageEndRef = useRef(null);

    const formatTime = (date) => {
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const minutesStr = minutes < 10 ? '0' + minutes : minutes;
        return hours + ':' + minutesStr + '' + ampm;
    }

    const displaytime = formatTime(new Date());

    const loadmessages = (e) => {
        e.preventDefault();
        const msg = [...message, { message: mes, color: "#aff9fe", right: 1.5, ml: 5 }];
        setmessage(msg)
        setmes("");
    }

    const handleChange = (e) => {
        setmes(e.target.value);
    }

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottom();
    }, [message]);

    return (
        <div>
            <div className='w-[100vw] flex'>
                <div className='bg-[#FF0000] lg:w-[25vw] sm:w-0 h-[100vh]'></div>
                <div className='flex flex-col w-full h-[100vh] '>
                    <div className='bg-[#FEFEFE] flex justify-center px-[24px] py-[36px] font-bold '>
                        <div>23BCE1313</div>
                    </div>
                    <div className='h-[94vh] bg-[#F4F4F4] lg:w-[80vw] sm:w-[100vw] max-h-[82vh]'>
                        <div className='min-h-[92%] max-h-[92%] flex flex-col-reverse overflow-y-auto'>
                            <div className='flex flex-col lg:gap-[50px] sm:gap-[90px] my-5'>
                                {message.map((item, index) => {
                                    return (
                                        <div key={index} className='my-8 mb-5 w-full relative flex flex-col  '>
                                            <div
                                                style={{ backgroundColor: item.color, right: `${item.right}%` }}
                                                className={`absolute rounded-xl  mr-8 lg:min-w-[80px] sm:min-w-[24vw] ml-6`} >
                                                <div className='mx-[15px] my-[20px] max-w-[90%] w-fit break-words'>
                                                    {item.message}
                                                </div>
                                                <div style={{ right: `${item.ml}%` }} className='absolute mx-2 text-sm my-1'>{displaytime}</div>
                                            </div>
                                        </div>
                                    );
                                })}
                                <div ref={messageEndRef}></div>
                            </div>
                        </div>
                        <div className='bottom-0 fixed w-[100%] flex'>
                            <form onSubmit={loadmessages}>
                                <div className='relative lg:w-[80vw] sm:w-[100vw] flex'>
                                    <input onChange={handleChange} value={mes} type="text" className='px-4 py-6 rounded-md mx-[8px] my-[10px] w-[100vw]' placeholder='Type your message...' />
                                    <button disabled={mes.length < 1} type='submit' className='z-[10px] absolute right-8 top-10 scale-[180%]' onClick={loadmessages}>
                                        <VscSend color='blue' />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home;
