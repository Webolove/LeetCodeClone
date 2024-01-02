import React, { useEffect, useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import Login from './Login'
import SignUp from './SignUp'
import ResetPass from './ResetPass'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { authModelState } from '@/atoms/authModelAtom'

export default function GlobalAuth() {
    const authModel = useRecoilValue(authModelState);
    const setauthModel = useSetRecoilState(authModelState);

    function authCloseHandler(){
        setauthModel((prev)=>({...prev, isOpen:false, type:'login'}));
    }

    const handleEsc = (event) => {
        if(event.key == 'Escape') authCloseHandler();
    }

    return (
        <>
            <div className='absolute top-0 left-0 w-full h-full flex place-items-center justify-center bg-black bg-opacity-60' onClick={authCloseHandler}></div>
            <div className='w-full sm:w-[450px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-center place-items-center' onKeyDown={(e)=>handleEsc(e)}>
                <div className='relative w-full h-full mx-auto flex place-items-center justify-center'>
                    <div className='bg-white rounded-lg shadow relative w-full bg-gradient-to-b from-brand-orange to-slate-900 mx-6'>
                        <div className='flex justify-end p-2'>
                            <button type='button' className='bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 text-white transition ease-in-out transition ease-in' onClick={authCloseHandler}>
                                <IoCloseOutline className='h-5 w-5' />
                            </button>
                        </div>
                        {authModel.type == 'login' ? <Login /> : authModel.type == 'register' ? <SignUp /> : <ResetPass />}
                    </div>
                </div>
            </div>
        </>
    )
}
