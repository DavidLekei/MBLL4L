'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"

import Benefits from './benefits'

export default function About(props: any) {

  const [open, setOpen] = useState(false)

  const close = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {props.trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[850px] sm:min-h-[75%] bg-white">
        <DialogHeader>
          <DialogTitle><h1>Manitoba Lawyer Lookup - For Lawyers</h1></DialogTitle>
        </DialogHeader>
        <div>
            <div>
              <h1 className="text-2xl font-bold">Why?</h1><br />
              <p>My fiancee works at a law firm here in Winnipeg. Every so often she would need a list of other lawyers in Winnipeg.<br/>
              I wrote a program that would retrieve all lawyers in a given city and send it to her in an email, but I found 1. It would be better if she could get the data herself.<br />
              2. I could store the data in my own database so my program didn't break every few months.<br/>3. Everyone could use it!</p>
            </div>
            <br />
            <div>
              <h1 className="text-2xl font-bold">Do I need an account?</h1><br />
              <p>Nope! This site is and will always be completely free to use.</p>
            </div>
            <br />
            <Benefits showHeader/>
        </div>
        <DialogFooter>
          <Button type="submit" className="hover:bg-primary-hover" onClick={close}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
