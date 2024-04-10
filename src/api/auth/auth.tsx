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
}

export const AuthContext = createContext<AuthContext>({
    user: null,
    setUser: (user) => user
});

export default function AuthenticationProvider(props: any){

    const [user, setUser] = useState<User | null>(null)

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
                setUser
            }}>
            {props.children}
        </AuthContext.Provider>
    )
}