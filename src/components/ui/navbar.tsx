'use client';

import {
    Button
} from '@/components/ui/button'

import Styles from '../../app/page.module.css'

import About from './about'
import LoginSheet from './loginsheet'
  
  
export default function Navbar(props: any){

    const aboutButton = <Button className="ml-10" variant="ghost">About</Button>
    const logInButton = <Button className="ml-10 hover:bg-primary-hover">Log In</Button>

    return(
        <div className="mt-10 w-full flex flex-row items-center justify-between">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Demo
                {/* Manitoba Lawyer Lookup - For Lawyers */}
            </h1>
            <div className="flex flex-row justify-evenly">
                <Button className="ml-10" variant="ghost">API</Button>
                <About trigger={aboutButton} />
                <Button className="ml-10" variant="ghost">Sign Up</Button>
                <LoginSheet trigger={logInButton} />
            </div>
        </div>
    )
}