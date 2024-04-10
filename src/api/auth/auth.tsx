'use client'

import { useRouter } from 'next/navigation'
import {Component, useContext, createContext, useState, useEffect} from 'react'

type Token = {
    value: string,
    expiration: string
}
export type User = {
    token: Token,
    email: string
}

type AuthContext = {
    user: User | null;
    setUser(user: User): void;
    logout():void
}

export const AuthContext = createContext<AuthContext>({
    user: null,
    setUser: (user) => user,
    logout: () => {}
});

export default function AuthenticationProvider(props: any){

    const router = useRouter()

    const [user, setUser] = useState<User | null>(null)

    const logout = () => {
        localStorage.removeItem('user')
        setUser(null)
        router.push("/")
    }

    if(!user){
        const currentUser = JSON.parse(localStorage.getItem('user') as any)
        if(currentUser != null){
            setUser(currentUser)
        }
    }

    return(
        <AuthContext.Provider
            value={{
                user,
                setUser,
                logout
            }}>
            {props.children}
        </AuthContext.Provider>
    )
}