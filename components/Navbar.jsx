"use client"
import React, {useState} from "react";
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon } from "@/assets/assets";
import Link from "next/link"
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { isAdmin, user } = useAppContext();
  const { openSignIn } = useClerk()

  const handleSearch = (e) => {
  e.preventDefault();
  if (searchQuery.trim()) {
    // Redirect to all-products page with search query
    router.push(`/all-products?search=${encodeURIComponent(searchQuery)}`);
    setIsSearchOpen(false);
    setSearchQuery("");
  }
};

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
      
      <Link href="/">
        <span className="text-semibold text-2xl text-orange-500">E<span className="text-black text-normal text-lg">lectroCart</span></span>
      </Link>
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

        {isAdmin && <button onClick={() => router.push('/admin')} className="text-xs border px-4 py-1.5 rounded-full">Admin Dashboard</button>}

      </div>

      <ul className="hidden md:flex items-center gap-4 ">
         <Image 
            className={`w-4 h-4 cursor-pointer hover:opacity-70 transition ${isSearchOpen ? 'hidden' : 'flex'}`}  
            src={assets.search_icon} 
            alt="search icon"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          />
        {
          user
            ? <>
              <UserButton>
                <UserButton.MenuItems>
                  <UserButton.Action label="Cart" labelIcon={<CartIcon />} onClick={() => router.push('/cart')} />
                </UserButton.MenuItems>
                <UserButton.MenuItems>
                  <UserButton.Action label="My Orders" labelIcon={<BagIcon />} onClick={() => router.push('/my-orders')} />
                </UserButton.MenuItems>
              </UserButton>
            </>
            : <button onClick={openSignIn} className="flex items-center gap-2 hover:text-gray-900 transition">
              <Image src={assets.user_icon} alt="user icon" />
              Account
            </button>
        }
      </ul>

      <div className="flex items-center md:hidden gap-3">
        <Image 
           className={`w-4 h-4 cursor-pointer hover:opacity-70 transition ${isSearchOpen ? 'hidden' : 'flex'}`} 
            src={assets.search_icon} 
            alt="search icon"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          />
        {isAdmin && <button onClick={() => router.push('/admin')} className="text-xs border px-4 py-1.5 rounded-full">Admin Dashboard</button>}
        {
          user
            ? <>
              <UserButton>
              <UserButton.MenuItems>
                  <UserButton.Action label="Home" labelIcon={<HomeIcon />} onClick={() => router.push('/')} />
                </UserButton.MenuItems>
                <UserButton.MenuItems>
                  <UserButton.Action label="Products" labelIcon={<BoxIcon />} onClick={() => router.push('/all-products')} />
                </UserButton.MenuItems>
                <UserButton.MenuItems>
                  <UserButton.Action label="Cart" labelIcon={<CartIcon />} onClick={() => router.push('/cart')} />
                </UserButton.MenuItems>
                <UserButton.MenuItems>
                  <UserButton.Action label="My Orders" labelIcon={<BagIcon />} onClick={() => router.push('/my-orders')} />
                </UserButton.MenuItems>
              </UserButton>
            </>
            : <button onClick={openSignIn} className="flex items-center gap-2 hover:text-gray-900 transition">
              <Image src={assets.user_icon} alt="user icon" />
              Account
            </button>
        }
      </div>

       {/* Search Bar */}
      {isSearchOpen && (
        <div className="px-2 md:px-4 lg:px-8 py-3 border-b border-gray-300 bg-gray-50">
          <form onSubmit={handleSearch} className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              autoFocus
            />
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="px-4 py-2 text-gray-500 hover:text-gray-700 transition"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navbar;