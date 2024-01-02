'use client'
import React from 'react'
import Link from 'next/link'
import { useSetRecoilState } from 'recoil'
import { authModelState } from '@/atoms/authModelAtom'

export default function Navbar() {
  const setauthModel = useSetRecoilState(authModelState);
  function showAuth() {
    setauthModel((prev) => ({ ...prev, isOpen: true }))
  }


  return (
    <div className='flex place-items-center justify-between sm:px-12 px-2 md:px-24'>
      <Link href='/' className='flex place-items-center justify-center h-20 text-white'>
        CampusCoder
      </Link>
      <div className="flex place-items-center">
        <button className='bg-brand-orange text-white px-2 py-1 sm:px-4 rounded-md text-sm font-medium hover:text-brand-orange hover:bg-white hover:border-2 hover:border-brand-orange border-2 border-transparent transition ease-in' onClick={showAuth}>Sign In</button>
      </div>
    </div>
  )
}
