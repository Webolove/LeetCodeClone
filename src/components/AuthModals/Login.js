'use client'
import { authModelState } from '@/atoms/authModelAtom'
import React, { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import {useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth'
import { auth } from '@/firebase/firebase'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function Login() {
    const setauthModel = useSetRecoilState(authModelState);
    function authHandler(authType){
        setauthModel((prev)=>({...prev, type:authType}))
    }

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);

      const router = useRouter();
      const [formData, setFormData] = useState({email:'', password:''});

      function changeHandler(event){
        const {name, value} = event.target;
        setFormData((prev)=>({...prev, [name]:value}));
      }

      async function submitHandler(event){
        event.preventDefault();
        if(!formData.email || !formData.password){
            toast("Please fill all field", {
                icon:"🙄"
            })
            return;
        }
        try {
            const newUser = await signInWithEmailAndPassword(formData.email, formData.password);
            if (!newUser) {
                return;
            } else {
                router.push('/')
                toast.success("Welcome Back")
            }
        } catch (error) {
            toast.error("Looks like an error occured..");
        }
      }

      useEffect(() => {
        if (error) toast.error(error.message.split("/")[1].replace(").", "."));
    }, [error])

    return (
        <form className='space-y-6 px-6 pb-4' onSubmit={submitHandler}>
            <h3 className='text-xl font-medium text-white'>SignIn to Account</h3>
            <div>
                <label htmlFor="email" className='text-sm font-medium block mb-2 text-gray-300'>Your Email :</label>
                <input onChange={changeHandler} value={formData.email} type="email" name='email' id='email' className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white' placeholder='Enter Email' />
            </div>            
            <div>
                <label htmlFor="password" className='text-sm font-medium block mb-2 text-gray-300'>Your Password :</label>
                <input onChange={changeHandler} value={formData.password} type="password" name='password' id='password' className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white' placeholder='Enter password' />
            </div>
            <button className='w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s transition duration-500 ease-in-out'>
                {loading ? (<>Loggin in...</>) : (<>Log in</>)}
            </button>
            <button className='flex w-full justify-end'>
                <a href="#" className='text-sm block text-brand-orange hover:underline w-full text-right' onClick={()=>authHandler('forget')}>Forgot Password?</a>
            </button>
            <div className="text-sm font-medium text-gray-500">
                Not Registered? <a href="#" className='text-blue-500 hover:underline' onClick={()=>authHandler('register')}>Create Account </a>
            </div>
        </form>
    )
}
