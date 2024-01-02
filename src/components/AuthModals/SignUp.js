'use client'
import { authModelState } from '@/atoms/authModelAtom';
import { auth, firestore } from '@/firebase/firebase';
import React, { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { setDoc, doc } from '@firebase/firestore';

export default function SignUp() {

    const [formData, setFormData] = useState({ email: '', name: '', password: '' });

    const changeHandler = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const router = useRouter();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    async function submitHandler(event) {
        event.preventDefault();
        if (!formData.email || !formData.name || !formData.password) {
            toast("Please fill all field", {
                icon: "🙄"
            })
            return;
        }

        try {
            const newUser = await createUserWithEmailAndPassword(formData.email, formData.password);
            if (!newUser) {
                return;
            } else {
                const userData = {
                    u_id: newUser.user.uid,
                    email: newUser.user.email,
                    displayName: formData.name,
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                    likedProblems: [],
                    dislikedProblems: [],
                    starredProblems: [],
                    solvedProblems: []
                };
                await setDoc(doc(firestore, "users", newUser.user.uid), userData);

                router.push('/')
                toast.success("Account Created")
            }
        } catch (error) {
            toast.error("Looks like an error occured..");
        }
    }

    useEffect(() => {
        if (error) toast.error(error.message);
    }, [error])

    const setauthModel = useSetRecoilState(authModelState);
    function authHandler(authType) {
        setauthModel((prev) => ({ ...prev, type: authType }))
    }

    return (
        <form className='space-y-6 px-6 pb-4' onSubmit={(e) => submitHandler(e)}>
            <h3 className='text-xl font-medium text-white'>Register </h3>
            <div>
                <label htmlFor="email" className='text-sm font-medium block mb-2 text-gray-300'>Email :</label>
                <input value={formData.email} onChange={(e) => changeHandler(e)} type="email" name='email' id='email' className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white' placeholder='Enter Email' />
            </div>
            <div>
                <label htmlFor="name" className='text-sm font-medium block mb-2 text-gray-300'>Name :</label>
                <input value={formData.name} onChange={(e) => changeHandler(e)} type="name" name='name' id='name' className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white' placeholder='Your Name' />
            </div>
            <div>
                <label htmlFor="password" className='text-sm font-medium block mb-2 text-gray-300'>Your Password :</label>
                <input value={formData.password} onChange={(e) => changeHandler(e)} type="password" name='password' id='password' className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white' placeholder='Enter password' />
            </div>
            <button className='w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s transition duration-500 ease-in-out'>
                {loading ? (<>Creating Account..</>) : (<>Create Account</>)}
            </button>
            <div className="text-sm font-medium text-gray-500">
                Already have an account? <a href="#" className='text-blue-500 hover:underline' onClick={() => authHandler('login')}>Log in </a>
            </div>
        </form>
    )
}
