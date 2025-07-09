"use client";

import React from 'react'
import Link from 'next/link'
import { useClerk, UserButton } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon } from "@/assets/assets";


const Navbar = () => {
    const router = useRouter();
    const { openSignIn } = useClerk();
  return (
    <nav className='flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700'>
        <span className="text-lg" href="/"><span className='text-orange-600 text-2xl'>E</span>lectroCart</span>
         <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-gray-900 transition">
          Home
        </Link>
        <Link href="/all-products" className="hover:text-gray-900 transition">
          Shop
        </Link>
        <Link href="/about" className="hover:text-gray-900 transition">
          About Us
        </Link>
        <Link href="/contact" className="hover:text-gray-900 transition">
          Contact
        </Link>
      </div>

       <ul className="hidden md:flex items-center gap-4 ">
        <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" />
       
              <UserButton>
                <UserButton.MenuItems>
                  <UserButton.Action label="Cart" labelIcon={<CartIcon />} onClick={() => router.push('/cart')} />
                </UserButton.MenuItems>
                <UserButton.MenuItems>
                  <UserButton.Action label="My Orders" labelIcon={<BagIcon />} onClick={() => router.push('/my-orders')} />
                </UserButton.MenuItems>
              </UserButton>
           
             <button onClick={openSignIn} className="flex items-center gap-2 hover:text-gray-900 transition">
              <Image src={assets.user_icon} alt="user icon" />
              Account
            </button>
        
      </ul>

    </nav>
  )
}

export default Navbar