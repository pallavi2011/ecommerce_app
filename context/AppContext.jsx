"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';
import axios from 'axios';
import { toast } from 'react-hot-toast';

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

     useEffect(() => {
        if (user) {
            fetchUserData()
        }
    }, [user])

    const value ={
        user, getToken,
        isAdmin, setIsAdmin,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}