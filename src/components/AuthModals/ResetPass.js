import { auth } from '@/firebase/firebase';
import React, { useEffect, useState } from 'react'
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';

export default function ResetPass() {
    const [email, setemail] = useState('');
    const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);

    async function submitHandler(event){
        event.preventDefault();
        const success = await sendPasswordResetEmail(email);
        if(success)
            toast.success("Mail sent")
    }

    useEffect(()=>{
        if(error) 
            toast(error.message.split("/")[1])
    },[error])

    return (
        <form className='space-y-6 px-6 pb-4' onSubmit={submitHandler}>
            <h3 className='text-xl font-medium text-white'>Reset Password</h3>
            <p className="text-sm text-white">
                Forgot your password ? Don't worry.. Enter your email address below, and we&apos;ll send you an email allowing you to reset it.
            </p>
            <div>
                <label htmlFor="email" className='text-sm font-medium block mb-2 text-gray-300'>Your Email :</label>
                <input type="email" name='email' id='email' className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white' placeholder='Enter Email' onChange={(e)=>(setemail(e.target.value))} />
            </div>

            <button className='w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s transition duration-500 ease-in-out'>
                {!sending ? (<>Reset Password</>) : (<>Sending Mail..</>)}
            </button>

        </form>
    )
}
