'use client'
import Problems from '@/mockProblems/Problems'
import React, { useEffect, useState } from 'react'
import { BsCheckCircle } from 'react-icons/bs'
import { AiFillYoutube } from 'react-icons/ai'
import Link from 'next/link';
import { IoClose } from 'react-icons/io5';
import YouTube from 'react-youtube';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase/firebase'
import { VscTarget } from "react-icons/vsc";


export default function QuestionList({ problemRecord, loading }) {
    const problem = Problems;
    const [youtubeViewer, setYoutubeViewer] = useState({
        isOpen: false,
        videoId: ""
    })

    const [user] = useAuthState(auth);

    return (
        <>
            <h1 className='bg-dark-layer-2 text-center text-gray-700 dark:text-gray-400 font-medium uppercase mt-10 mb-5'>
                &ldquo; Quality &ensp; Over &ensp; Quantity &rdquo; 👇🏻
            </h1>

            <div className='overflow-x-auto relative mx-auto px-6 pb-10'>
                <table className='text-sm text-left text-gray-500 dark:text-gray-400 sm:w-7/12 w-full max-w-[1200px] mx-auto'>
                    <thead className='text-xs text-gray-700 uppercase dark:text-gray-400 border-b'>
                        <tr>
                            <th scope='col' className='px-1 py-3 w-0 font-medium'>
                                Status
                            </th>
                            <th scope='col' className='px-6 py-3 w-0 font-medium'>
                                Title
                            </th>
                            <th scope='col' className='px-6 py-3 w-0 font-medium'>
                                Difficulty
                            </th>
                            <th scope='col' className='px-6 py-3 w-0 font-medium'>
                                Category
                            </th>
                            <th scope='col' className='px-6 py-3 w-0 font-medium'>
                                Solution
                            </th>
                        </tr>
                    </thead>
                    <>

                        <tbody className='text-white'>
                            {
                                problem.map((question, index) => {
                                    const difficultyColor = question.difficulty == "Easy" ? 'text-dark-green-s' : question.difficulty == "Medium" ? "text-dark-yellow" : "text-dark-red";
                                    const videoLink = question.videoId;

                                    return (
                                        <tr className={`${index % 2 == 1 ? 'bg-dark-layer-1' : ''}`} key={question.id}>
                                            <th className='px-2 py-4 font-medium whitespace-nowrap text-dark-green-s'>
                                                {user && (problemRecord.includes(question.id)) ? <BsCheckCircle fontSize={"18"} width="18" /> : <VscTarget fontSize={"18"} width="18" />}
                                            </th>
                                            <td className='px-6 py-4'>
                                                <Link href={`/problem/${question.id}`} className='hover:text-blue-600 cursor-pointer '>
                                                    {question.title}
                                                </Link>
                                            </td>
                                            <td className={`px-6 py-4 ${difficultyColor}`}>
                                                {question.difficulty}
                                            </td>
                                            <td className='px-6 py-4'>
                                                {question.category}
                                            </td>
                                            <td className='px-6 py-4'>
                                                {
                                                    videoLink == "" ? (<p className='text-gray-400'>Coming Soon</p>) : (<><AiFillYoutube fontSize={"25"} width="25" className='hover:text-red-600 transition ease-in cursor-pointer' onClick={() => setYoutubeViewer({ isOpen: true, videoId: question.videoId })} /></>)
                                                }
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                        {youtubeViewer.isOpen && <tfoot className='fixed top-0 left-0 h-screen w-screen flex place-items-center justify-center'>
                            <div className='bg-black z-10 opacity-70 top-0 left-0 w-screen h-screen absolute' onClick={() => setYoutubeViewer({ isOpen: false, videoId: "" })} ></div>
                            <div className='w-full z-50 h-full px-6 relative max-w-4xl'>
                                <div className='w-full h-full flex place-items-center justify-center relative'>
                                    <div className="w-full relative">
                                        <IoClose fontSize={"35"} className='cursor-pointer absolute -top-16 right-0' onClick={() => setYoutubeViewer({ isOpen: false, videoId: "" })} />
                                        <YouTube videoId={youtubeViewer.videoId} loading='lazy' iframeClassName='w-full min-h-[500px]' />
                                    </div>
                                </div>
                            </div>
                        </tfoot>}
                    </>
                </table>
            </div>

        </>
    )
}