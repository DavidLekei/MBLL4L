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

export default function LoginSheet(props: any){
    return(
        <Sheet>
            <SheetTrigger asChild>
                {props.trigger}
            </SheetTrigger>
            <SheetContent className="bg-white">
                <SheetHeader>
                <SheetTitle>Log In</SheetTitle>
                <SheetDescription>
                    Enter your email address and password.
                </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                    Email
                    </Label>
                    <Input id="email" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                    Password
                    </Label>
                    <Input id="password" className="col-span-3" type="password"/>
                </div>
                </div>
                <SheetFooter>
                <SheetClose asChild>
                    <Button type="submit">Log In</Button>
                </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}