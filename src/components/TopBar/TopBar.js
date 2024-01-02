'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'
import { useAuthState } from 'react-firebase-hooks/auth'
import { FaChevronLeft, FaChevronRight, FaUserCircle } from 'react-icons/fa'
import { auth } from '@/firebase/firebase'
import Logout from '../Buttons/Logout'
import { useSetRecoilState } from 'recoil'
import { authModelState } from '@/atoms/authModelAtom'
import { BsList } from 'react-icons/bs'
import Timer from '../Timer'
import { useRouter } from 'next/navigation'
import { problems } from '@/utils/Problems'

export default function TopBar({ problemPage, params }) {
    const user = useAuthState(auth);
    const setauthModel = useSetRecoilState(authModelState);
    const router = useRouter();

    const handleProblemChange = (isForward) => {
        // console.log(problems[params.pid])

        const Order = problems[params.pid].order;
        const direction = isForward ? 1 : -1;
        const nextProblemOrder = Order + direction;

        const nextProblemKey = Object.keys(problems).find((key) => problems[key].order == nextProblemOrder);

        if (isForward && nextProblemKey == undefined) {
            const firstProblemKey = Object.keys(problems).find((key) => problems[key].order == 1);
            router.push(`/problem/${firstProblemKey}`);
        }
        else if (!isForward && nextProblemKey == undefined){
            const lastProblemKey = Object.keys(problems).find((key) => problems[key].order == Object.keys(problems).length)
            router.push(`/problem/${lastProblemKey}`)
        }
        else{
            router.push(`/problem/${nextProblemKey}`);
        }

    }

    return (
        <nav className='relative flex h-[50px] w-full shrink-0 place-items-center px-5 bg-dark-layer-1 text-dark-gray-7 py-7'>
            <div className={`flex w-full place-items-center justify-between ${!problemPage ? 'max-w-[1200px] mx-auto' : ""}`}>
                <Link href='/' className='h-[22px] flex-1 font-semibold text-white'>
                    CampusCoder
                </Link>

                {
                    problemPage && (
                        <div className='flex place-items-center gap-4 flex-1 justify-center'>
                            <div className="flex place-items-center justify-center rounded bg-zinc-700 h-8 w-8 cursor-pointer" onClick={() => { handleProblemChange(false) }}>
                                <FaChevronLeft />
                            </div>

                            <Link href='/' className='flex place-items-center gap-2 font-medium max-w-[170px] text-dark-grey-8 cursor-pointer'>
                                <div>
                                    <BsList />
                                </div>
                                <p>Problem List</p>
                            </Link>

                            <div className="flex place-items-center justify-center rounded bg-zinc-700 h-8 w-8 cursor-pointer" onClick={() => { handleProblemChange(true) }}>
                                <FaChevronRight />
                            </div>
                        </div>
                    )
                }

                <div className='flex place-items-center space-x-8 flex-1 justify-end'>
                    {
                        user[0] == null ? (<Link href='/auth' onClick={() => setauthModel((prev) => ({ ...prev, isOpen: true, type: 'login' }))}>
                            <button className='bg-zinc-700 py-1 px-2 cursor-pointer rounded'>Sign In</button>
                        </Link>) : (<div className='cursor-pointer group relative'>
                            <FaUserCircle fontSize={"23"} width='23' />
                            <div className='absolute top-12 left-2/4 -translate-x-2/4 mx-auto bg-dark-layer-1 text-brand-orange p-2 px-3 rounded shadow-lg z-40 group-hover:scale-100 scale-0 transition-all duration-300 ease-in-out'>
                                <p className='text-sm'>{user[0] != null && user[0].reloadUserInfo.email}</p>
                            </div>
                        </div>)
                    }

                    {
                        user[0] && problemPage && <Timer />
                    }

                    <div>
                        <a href="https://mudit-anand-me.onrender.com" target="_blank" rel='noreferrer' className='bg-zinc-700 py-1.5 px-3 cursor-pointer rounded text-brand-orange'>
                            Premium
                        </a>
                    </div>

                    {user[0] != null && <Logout />}

                </div>
            </div>
        </nav>
    )
}
