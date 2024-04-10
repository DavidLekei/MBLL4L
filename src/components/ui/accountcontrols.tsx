"use client"

import * as React from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import LoginSheet from "./loginsheet"
import { useRouter } from "next/navigation"
import { AuthContext } from "@/api/auth/auth"
import { useContext } from "react"

export default function AccountControls() {

  const router = useRouter()
  const auth = useContext(AuthContext)

  const signup = () => {
    router.push("/signup")
  }

  const preferences = () => {
    router.push("/preferences")
  }

  const logout = () => {
    console.log('logout')
    auth.logout()
  }

  const logInButton = <Button className="ml-10 hover:bg-primary-hover">Log In</Button>

  const account = <Button className="ml-10 text-xl font-bold" variant="ghost">{auth.user?auth.user.email:''}</Button>
//   const account = <div className="ml-10 lg:text-xl font-bold flex items-center">{auth.user.email}</div>
  const signUpButton = <Button className="ml-10" variant="ghost" onClick={signup}>Sign Up</Button>
  const loginSheet = <LoginSheet trigger={logInButton} />

  if(!auth.user){
    return(
        <div>{signUpButton}{loginSheet}</div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {account}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col z-50 bg-white">
        <DropdownMenuSeparator />
        <Button variant="ghost" onClick={preferences}>
          Preferences
        </Button>
        <Button variant="secondary" onClick={logout}>
          Logout
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
