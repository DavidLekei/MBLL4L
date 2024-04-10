import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from "./button"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useState } from "react"

  export default function SavedSearches(props: any){

    const [selected, setSelected] = useState<string | undefined>()
    const [key, setKey] = useState<number>(0)

    const onSelect = (value: string) => {
        setSelected(value)
        props.setSearchTerm(value)
    }

    const clear = () => {
        props.setSearchTerm('')
        setSelected(undefined)
        setKey(key + 1)
    }

    const mockData = [
        'Winnipeg',
        'Evans',
        'Dauphin'
    ]

    const savedSearchTerms =
        mockData.map((searchTerm, index) => {
            return(
                <SelectItem value={searchTerm}>{searchTerm}</SelectItem>
            )
        })

    return (
        <div className="flex flex-row">
            <Select onValueChange={onSelect} value={selected} key={key}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Saved searches" />
            </SelectTrigger>
            <SelectContent className="bg-white">
                <SelectGroup>
                    {savedSearchTerms}
                </SelectGroup>
            </SelectContent>
            </Select>
            <Button variant="ghost" onClick={clear}>Clear</Button>
        </div>
      )
    // return(
    //     <DropdownMenu>
    //         <DropdownMenuTrigger asChild>
    //             <Button variant="outline" className="pl-10">Saved searches<img src="down-24.png" className="ml-5"></img></Button>
    //         </DropdownMenuTrigger>
    //         <DropdownMenuContent className="flex flex-col z-50 bg-white">
    //         <DropdownMenuSeparator />
    //         <Button variant="ghost" onClick={() => {}}>
    //             Winnipeg
    //         </Button>
    //         <Button variant="ghost" onClick={() => {}}>
    //             Evans
    //         </Button>
    //         <Button variant="ghost">
    //             <img src="add-24.png" className="text-dropdown"></img>
    //             Add New
    //         </Button>
    //         </DropdownMenuContent>
    //     </DropdownMenu>
    // )
}