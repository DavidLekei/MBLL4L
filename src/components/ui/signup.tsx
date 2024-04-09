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

export default function SignupForm() {
    
    const onSubmit = () => {

    }

    return (
        <div className="w-full flex flex-col items-center">
            <form className="w-1/2 justify-evenly min-h-48">
                <div className="mt-5">
                    <Label htmlFor="email-input">Email address</Label>
                    <Input id="email-input" className="rounded-lg"></Input>
                </div>
                <div className="mt-5">
                <Label htmlFor="password-input">Password</Label>
                <Input id="password-input" type="password" className="rounded-lg"></Input>
                </div>
                <div className="mt-5">
                <Label htmlFor="validate-password">Re-enter your password</Label>
                <Input id="validate-password" type="password" className="w1/2 rounded-lg"></Input>
                </div>
                <Button type="submit" className="mt-5">Sign up</Button>
            </form>
        </div>
    )
  }