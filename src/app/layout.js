'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import { RecoilRoot } from 'recoil'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <RecoilRoot>
      <html lang="en">
        <Head>
          <title>LeetCode</title>
          <meta name='description' content='LeetCode Clone' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
        </Head>

        <body className={inter.className}>
          {children}
          <Toaster />
        </body>

      </html>
    </RecoilRoot>
  )
}
