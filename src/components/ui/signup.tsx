import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label'
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function SignupForm() {

    const router = useRouter();
    
    async function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const email = formData.get("email")
        const password = formData.get("password");

        await fetch('http://localhost:8080/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        }).then((response) => {
            if(response.ok){
                //Set User - AuthProvider?
                console.log('successfully registered')
                console.log('user data: ', response.body)
                router.push("/")
            }
        })
    }

    return (
        <div className="w-full flex flex-col items-center">
            <form className="w-1/2 justify-evenly min-h-48" onSubmit={handleSubmit}>
                <div className="mt-5">
                    <Label htmlFor="email-input">Email address</Label>
                    <Input name="email" id="email-input" className="rounded-lg"></Input>
                </div>
                <div className="mt-5">
                    <Label htmlFor="password-input">Password</Label>
                    <Input name="password" id="password-input" type="password" className="rounded-lg"></Input>
                </div>
                <div className="mt-5">
                    <Label htmlFor="validate-password">Re-enter your password</Label>
                    <Input id="validate-password" type="password" className="w1/2 rounded-lg"></Input>
                </div>
                <Button type="submit" className="mt-5 hover:bg-primary-hover">Sign up</Button>
            </form>
        </div>
    )
  }