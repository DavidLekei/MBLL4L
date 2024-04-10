'use client';

import {
    Button
} from '@/components/ui/button'

import { useRouter } from 'next/navigation'

import About from './about'
import LoginSheet from './loginsheet'
import { AuthContext } from '@/api/auth/auth';
import { useContext } from 'react';
  
  
export default function Navbar(props: any){

    const router = useRouter()

    const auth = useContext(AuthContext)

    console.log('auth: ', auth)

    const home = () => {
        router.push("/")
    }

    const signup = () => {
        router.push("/signup")
    }

    const aboutButton = <Button className="ml-10" variant="ghost">About</Button>
    const logInButton = <Button className="ml-10 hover:bg-primary-hover">Log In</Button>

    const signUpButton = <Button className="ml-10" variant="ghost" onClick={signup}>Sign Up</Button>
    const loginSheet = <LoginSheet trigger={logInButton} />

    const buttons = <div>{signUpButton}{loginSheet}</div>

    return(
        <div className="mt-10 w-full flex flex-row items-center justify-between">
            <h1 id="title" className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl cursor-pointer" onClick={home}>
                MBLL4L
                {/* Manitoba Lawyer Lookup - For Lawyers */}
            </h1>
            <div className="flex flex-row justify-evenly">
                <Button className="ml-10" variant="ghost">API</Button>
                <About trigger={aboutButton} />
                {auth.user ? <div className="ml-10 lg:text-xl font-bold flex items-center">{auth.user.email}</div> : buttons}
            </div>
        </div>
    )
}