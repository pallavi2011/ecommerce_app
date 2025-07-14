import React from 'react'
import { useAppContext } from '@/context/AppContext'
import Link from 'next/link'
const Navbar = () => {

  const { router } = useAppContext()

  return (
    <div className='flex items-center px-4 md:px-8 py-3 justify-between border-b'>
      <Link href="/">
        <span className="text-semibold text-2xl text-orange-500">E<span className="text-black text-normal text-lg">lectroCart</span></span>
      </Link>
      <button className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar