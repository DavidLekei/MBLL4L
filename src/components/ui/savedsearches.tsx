'use client'

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
import { useContext, useEffect, useState } from "react"
import { useToast } from "./use-toast"
import { ThemeContext } from "../theme/theme"

const mockData = [
    'Winnipeg',
    'Evans',
    'Dauphin'
]

  export default function SavedSearches(props: any){

    const {toast} = useToast()
    const theme = useContext(ThemeContext)

    const [selected, setSelected] = useState<string | undefined>()
    const [savedSearches, setSavedSearches] = useState<string[]>([])
    const [key, setKey] = useState<number>(0)

    //TODO: Call API to get from Database
    useEffect(() => {
        setSavedSearches(mockData)
    }, [])

    const onSelect = (value: string) => {
        setSelected(value)
        props.setSearchTerm(value)
    }

    const clear = () => {
        props.setSearchTerm('')
        setSelected(undefined)
        setKey(key + 1)
    }

    const add = () => {
        const searchTerm = (document.getElementById('search-input') as HTMLInputElement).value
        //TODO: API Call here to persist to Database
        if(searchTerm != '' && !mockData.includes(searchTerm)){
            mockData.push(searchTerm)
        }
        setSavedSearches(mockData)
        toast({
            title: 'New Search Added',
            description: 'Saved the search term "' + searchTerm + '" for future use.'
        })
    }


    //TODO: useEffect to get from database and re-render?

    return (
        <div className="flex flex-row">
            <Select onValueChange={onSelect} value={selected} key={key}>
            <SelectTrigger className={`w-[180px] ${(theme.theme == 'Dark') ? 'Dark': 'bg-white'}`}>
                <SelectValue placeholder="Saved searches" />
            </SelectTrigger>
            <SelectContent className={`${(theme.theme == 'Dark') ? 'Dark': 'bg-white'}`}>
                <SelectGroup>
                    {savedSearches.map((searchTerm, index) => {
                            return(
                                <SelectItem value={searchTerm}>
                                    {searchTerm}
                                </SelectItem>
                            )
                    })}
                </SelectGroup>
            </SelectContent>
            </Select>
            <Button variant="ghost" onClick={clear}>Clear</Button>
            <Button variant="ghost" onClick={add}>Add</Button>
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