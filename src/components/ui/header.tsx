'use client'

import { Button } from "@/components/ui/button"
import {Input} from"@/components/ui/input"
import { useState } from "react";

export default function Header(props:any){

    const [input, setInput] = useState<string>();

    const search = () => {
        props.setSearchTerm(input)
    }

    return(
    <div className="w-full">
        <div id="button-container" className="flex flex-row justify-between mb-10">
            <div className="flex flex-row">
                <Input id="search-input" className="col-span-3 rounded-lg" type="text" placeholder="Name, City, Postal Code..." onInput={(e: Event) => {
                    setInput((e.target as HTMLInputElement).value)
                }}/>
                <Button className="ml-20 rounded-md hover:bg-primary-hover" onClick={search}>Search</Button>
            </div>
            <Button variant="outline">Export to CSV</Button>
        </div>
    </div>
    )
}