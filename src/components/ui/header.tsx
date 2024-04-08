import { Button } from "@/components/ui/button"

export default function Header(props:any){
    return(
    <div className="header container">
        <div id="button-container" className="flex flex-row-reverse">
            <Button variant="outline">Export to CSV</Button>
        </div>
    </div>
    )
}