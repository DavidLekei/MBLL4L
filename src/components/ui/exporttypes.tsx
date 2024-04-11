import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Link } from "lucide-react";
import { Button } from "./button";

export default function ExportTypes(props: any){

    const button = <Button variant="outline" className="ml-5 max-w-16"><img src="plus-48.png"></img></Button>

    const exportTypes = [
        'JSON',
        'XML',
        'DOCX'
    ]

    const exportDropdownItems = exportTypes.map((type, index) => {
        return(
            <DropdownMenuItem className="flex flex-row w-full text-med p-5 cursor-pointer">
                {type}
            </DropdownMenuItem>
        )
    })

    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
            {button}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col z-50 bg-white w-full">
            <DropdownMenuSeparator />
                {exportDropdownItems}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}