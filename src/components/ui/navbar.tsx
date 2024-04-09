'use client';

import {
    Button
} from '@/components/ui/button'

import { useRouter } from 'next/navigation'

import About from './about'
import LoginSheet from './loginsheet'
  
  
export default function Navbar(props: any){

    const router = useRouter()

    const aboutButton = <Button className="ml-10" variant="ghost">About</Button>
    const logInButton = <Button className="ml-10 hover:bg-primary-hover">Log In</Button>

    const home = () => {
        router.push("/")
    }

    const signup = () => {
        router.push("/signup")
    }

    return(
        <div className="mt-10 w-full flex flex-row items-center justify-between">
            <h1 id="title" className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl cursor-pointer" onClick={home}>
                MBLL4L
                {/* Manitoba Lawyer Lookup - For Lawyers */}
            </h1>
            <div className="flex flex-row justify-evenly">
                <Button className="ml-10" variant="ghost">API</Button>
                <About trigger={aboutButton} />
                <Button className="ml-10" variant="ghost" onClick={signup}>Sign Up</Button>
                <LoginSheet trigger={logInButton} />
            </div>
        </div>
    )
}