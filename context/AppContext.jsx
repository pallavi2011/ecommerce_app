"use client";

import { createContext, useContext, useState } from 'react';
import { useUser } from '@clerk/nextjs';

export const AppContext = createContext();

export const useAppContext = () => {
  
  return useContext(AppContext);
}

export const AppContextProvider = (props) => {
    const { user } = useUser()
     const [isAdmin, setIsAdmin] = useState(false)

    const value ={
        user,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}