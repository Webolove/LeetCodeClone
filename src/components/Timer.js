"use client"

import React, { useEffect, useState } from 'react'
import { FiRefreshCcw } from 'react-icons/fi';
import { LuAlarmClock } from 'react-icons/lu'

export default function Timer() {
    const [ShowTimer, setShowTimer] = useState(true);
    const [timer, setTimer] = useState(0);
    const [Format, setFormat] = useState("00:00:00");

    function formatTimer(timer) {
        let seconds = Number(timer) % 60;
        let minutes = Math.floor(Number(timer) / 60);
        let hours = Math.floor(Number(minutes) / 60);
        minutes = minutes % 60;

        setFormat(`${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
    }

    useEffect(()=>{
        formatTimer(timer);
    }, [timer]);

    useEffect(() => {
        if (!ShowTimer) {
            setInterval(() => {
                setTimer((timer) => timer + 1);
            }, 1000);
        }
    }, [ShowTimer])

    return (
        <div>
            {ShowTimer ? (<div className='flex place-items-center p-2 h-8 rounded cursor-pointer hover:bg-zinc-700 transition ease-in' onClick={() => setShowTimer(false)}>
                <LuAlarmClock fontSize={"21"} width="21px" />
            </div>) :
                (<div className='flex place-items-center justify-between space-x-2 bg-zinc-700 py-1.5 px-2 text-sm cursor-pointer rounded w-[100px]'>
                    <div>{Format}</div>
                    <FiRefreshCcw className='hover:text-brand-orange' onClick={() => {setTimer(0);}} />
                </div>)}
        </div>
    )
}
