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
     const [cartItems, setCartItems] = useState({})
    const [products, setProducts] = useState([])
    const router = useRouter()
   const currency = process.env.NEXT_PUBLIC_CURRENCY

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
                setCartItems(data.user.cartItems || {})
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const addToCart = async (itemId) => {
    if (!user) {
        return toast('Please login', { icon: '⚠️' });
    }

    // Update local cartItems object
    let cartData = structuredClone(cartItems || {});
    if (cartData[itemId]) {
        cartData[itemId] += 1;
    } else {
        cartData[itemId] = 1;
    }
    setCartItems(cartData);

    // Convert cartData object to array for backend
    const cartItemsArray = Object.entries(cartData).map(([productId, quantity]) => ({
        productId,
        quantity,
    }));

    if (user) {
        try {
            const token = await getToken();
            await axios.post(
                '/api/cart/update',
                { cartItems: cartItemsArray },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success('Item added to cart');
        } catch (error) {
            toast.error(error.message);
        }
    }
}

       const updateCartQuantity = async (itemId, quantity) => {
    let cartData = structuredClone(cartItems || {});
    if (quantity === 0) {
        delete cartData[itemId];
    } else {
        cartData[itemId] = quantity;
    }
    setCartItems(cartData);

    // Convert cartData object to array for backend
    const cartItemsArray = Object.entries(cartData).map(([productId, quantity]) => ({
        productId,
        quantity,
    }));

    if (user) {
        try {
            const token = await getToken();
            await axios.post(
                '/api/cart/update',
                { cartItems: cartItemsArray },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success('Cart Updated');
        } catch (error) {
            toast.error(error.message);
        }
    }
}
     const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            if (cartItems[items] > 0) {
                totalCount += cartItems[items];
            }
        }
        return totalCount;
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product => String(product.id) === String(items)));
            if (cartItems[items] > 0 && itemInfo) {
                totalAmount += itemInfo.price * cartItems[items];
            }
        }
        return Math.floor(totalAmount * 100) / 100;
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
        currency, router,
        setIsAdmin, isAdmin,
        userData, fetchUserData,
        products, fetchProductData,
        cartItems, setCartItems,
        addToCart, updateCartQuantity,
        getCartCount, getCartAmount
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}