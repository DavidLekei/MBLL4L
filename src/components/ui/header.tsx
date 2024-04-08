import { Button } from "@/components/ui/button"
import {Input} from"@/components/ui/input"

export default function Header(props:any){

    const onInputFocus = () => {

    }

    return(
    <div className="w-full">
        <div id="button-container" className="flex flex-row justify-between mb-10">
            <div className="flex flex-row">
                <Input id="search-input" className="col-span-3 rounded-lg" type="text" placeholder="Name, City, Postal Code..."/>
                <Button className="ml-20 rounded-md hover:bg-primary-hover">Search</Button>
            </div>
            <Button variant="outline">Export to CSV</Button>
        </div>
    </div>
    )
}