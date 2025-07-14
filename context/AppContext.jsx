"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export const AppContext = createContext();

export const useAppContext = () => {
  
  return useContext(AppContext);
}

export const AppContextProvider = (props) => {
    const { user } = useUser()
     const [isAdmin, setIsAdmin] = useState(false)
     const {getToken} = useAuth()
     const [userData, setUserData] = useState(null)
     const [cartItems, setCartItems] = useState([])
    const [products, setProducts] = useState([])
    const router = useRouter()
   

     const fetchProductData = async () => {
        try {
            
            const {data} = await axios.get('/api/product/product-list')

            if (data.success) {
                setProducts(data.products)
                console.log(data.products)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }


     const fetchUserData = async () => {
        try {
            if (user.publicMetadata.role === 'admin') {
                setIsAdmin(true)
            }

            const token = await getToken()

            const { data } = await axios.get('/api/user/data', { headers: { Authorization: `Bearer ${token}` } })

            if (data.success) {
                setUserData(data.user)
                setCartItems(data.user.cartItems)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }


    const addToCart = async (itemId) => {

        if (!user) {
            return toast('Please login',{
                icon: '⚠️',
              })
        }

        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] += 1;
        }
        else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        if (user) {
            try {
                const token = await getToken()
                await axios.post('/api/cart/update', {cartData}, {headers:{Authorization: `Bearer ${token}`}} )
                toast.success('Item added to cart')
            } catch (error) {
                toast.error(error.message)
            }
        }
    }


    useEffect(() => {
        fetchProductData()
    }, [])


     useEffect(() => {
        if (user) {
            fetchUserData()
        }
    }, [user])

    const value ={
        user, getToken,
        isAdmin, setIsAdmin,
        products, addToCart,
        router
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}