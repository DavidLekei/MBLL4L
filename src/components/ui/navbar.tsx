'use client';

import {
    Button
} from '@/components/ui/button'

import LoginSheet from './loginsheet'
  
  
export default function Navbar(props: any){

    const logInButton = <Button>Log In</Button>

    return(
        <div className="mt-10 ml-20 mr-20 flex flex-row items-center justify-between">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Manitoba Lawyer Lookup - For Lawyers
            </h1>
            <div className="flex flex-row">
                <Button variant="ghost">About</Button>
                <Button>Sign Up</Button>
                <LoginSheet trigger={logInButton} />
            </div>
        </div>
    )
}