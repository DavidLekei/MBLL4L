'use client'

import { useRouter } from 'next/navigation'

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
    SheetFooter
  } from "@/components/ui/sheet"
  
  import{
    Button
  } from "@/components/ui/button"

  import{
    Label
  } from "@/components/ui/label"

  import{
    Input
  } from "@/components/ui/input"

  import {
    Spinner 
  } from "@/components/ui/spinner"

import { FormEvent, useContext, useState } from 'react'
import { AuthContext } from '@/api/auth/auth'
import {User} from '@/api/auth/auth'

export default function LoginSheet(props: any){

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const auth = useContext(AuthContext)

    const router = useRouter();

    async function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault()

        setLoading(true)

        const formData = new FormData(event.currentTarget)
        const email = formData.get("email")
        const password = formData.get("password");

        await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        }).then((response) => {
            console.log('response status: ', response.status)
            if(response.ok){
                console.log('response is ok')
                console.log('response: ', response)
                response.json().then((data) => {
                    localStorage.setItem('user', JSON.stringify(data))
                    auth.setUser({
                        token: data.token,
                        email: data.email
                    })
                    setLoading(false)
                    setOpen(false)
                })
            }
        })
    }

    const content = <SheetContent className="bg-white">
                        <SheetHeader>
                        <SheetTitle>Log In</SheetTitle>
                        <SheetDescription>
                            Enter your email address and password.
                        </SheetDescription>
                        </SheetHeader>
                        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-right">
                                Email
                                </Label>
                                <Input name="email" id="email" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="password" className="text-right">
                                Password
                                </Label>
                                <Input name="password" id="password" className="col-span-3" type="password"/>
                            </div>
                            <Button type="submit" className="hover:bg-primary-hover">Log In</Button>
                        </form>
                    </SheetContent>

    return(
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                {props.trigger}
            </SheetTrigger>
            {loading ? <Spinner /> : content}
        </Sheet>
    )
}