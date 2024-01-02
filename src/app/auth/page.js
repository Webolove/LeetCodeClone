'use client'

import { authModelState } from '@/atoms/authModelAtom'
import GlobalAuth from '@/components/AuthModals/GlobalAuth'
import Navbar from '@/components/Navbar'
import { auth } from '@/firebase/firebase'
import { Erica_One } from 'next/font/google'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import toast from 'react-hot-toast'
import { useRecoilValue } from 'recoil'

export default function auth_page() {
    const authModel = useRecoilValue(authModelState)
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(()=>{
        if(user) router.push('/');
        if(!loading && !user) setPageLoading(false);
        if(error) toast.error(error.message);
    },[user, router, loading, error])

    return (
        <>
        {!pageLoading && <div className='bg-gradient-to-b from-gray-600 to-black h-screen relative'>
            <div className='max-w-7xl mx-auto'>
                <Navbar />
                {authModel.isOpen && <GlobalAuth />}                
            </div>
        </div>}
        </>
    )
}
