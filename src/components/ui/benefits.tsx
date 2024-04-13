export default function Benefits(props: any){

    const header = <h1 className="text-2xl font-bold">What benefits are there to an account?</h1>

    return(
        <div className="w-full ">
            {props.showHeader ? header : null}
            <br />
            <div className="flex flex-row items-center">
            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="green" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg> */}
                <img src="export-48.png" className="mr-5"></img>
                <p>Export to multiple file types (XML, JSON, etc)</p>
            </div>
            <div className="flex flex-row items-center mt-5">
                <img src="cycle-48.png" className="mr-5"></img>
                <p>Set up automated results emailed to you (daily, weekly, monthly, etc)</p>
            </div>
            <div className="flex flex-row items-center mt-5">
                <img src="preferences-48.png" className="mr-5"></img>
                <p>Set user preferences (Light vs Dark mode, Pagination vs Infinite Scroll, etc)</p>
            </div>
            <div className="flex flex-row items-center mt-5">
                <img src="details-48.png" className="mr-5"></img>
                <p>View detailed information about a Lawyer (complaints, history, etc.)</p>
            </div>
            <div className="flex flex-row items-center mt-5">
                <img src="code-48.png" className="mr-5"></img>
                <p>Access to the API and corresponding documentation</p>
            </div>
            <div className="flex flex-row items-center mt-5">
                <img src="more-48.png" className="mr-5"></img>
                <p>More</p>
            </div>
        </div>
    )
}