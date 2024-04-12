'use client'

import styles from "../../app/page.module.css"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"

import { Button } from "@/components/ui/button"
import {Input} from"@/components/ui/input"
  
import LawyerRow from './lawyerrow'
import { Lawyer } from "@/types/lawyer"
import { useContext, useEffect, useState } from "react"
import {getLawyers} from '../../api/api'
import { AuthContext } from "@/api/auth/auth"
import SavedSearches from "./savedsearches"
import ExportTypes from "./exporttypes"
import ExportControls from "./exportcontrols"

function getLawyerDataInTable(){

}

function ContactInformation(props: any){
    return(
        <div className="flex flex-col">
            <p>Email: {props.contact.email}</p>
            <p>Phone: {props.contact.phoneNumber}</p>
            <p>Fax: {props.contact.fax}</p>
            <p>Address: {props.contact.address + ", " + props.contact.city + ", " + props.contact.province + " " + props.contact.postalCode}</p>
        </div>
    )
}

export default function Lawyers(props: any){

    const [data, setData] = useState<Lawyer[]>([]);
    const [input, setInput] = useState<string>();
    const [searchTerm, setSearchTerm] = useState<string>();

    const auth = useContext(AuthContext)

    useEffect(
      () => {
        console.log('use effect')
        getLawyers(setData);
      }, []
    )

    if(!data){
      return(
        <div>
          Loading
        </div>
      )
    }

    const lawyersForExport: Lawyer[] = []

    const search = () => {
        console.log('searching for: ', input)
        setSearchTerm(input)
    }

    const download = (file: string) => {
      const a = document.createElement('a')
      a.style.display = "none"
      a.target = "_blank"
      a.href = "data:text/csv;charset=utf-8," + encodeURIComponent(file)
      a.download = "Manitoba-Lawyers-" + new Date() + ".csv"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }

    const exportToFile = () => {
      let csv = "Last Name, First Name, Firm, Email, Phone Number, Fax, Address, Status, History\n"

      lawyersForExport.forEach((lawyer: Lawyer, index: number) => {
        const addressString = lawyer.contact.address + ' ' + lawyer.contact.city + ' ' + lawyer.contact.province + ' ' + lawyer.contact.postalCode
        const asString = lawyer.lastName + ',' + lawyer.firstName  + ',' + lawyer.firm  + ',' + lawyer.contact.email  + ',' + lawyer.contact.phoneNumber  + ',' + lawyer.contact.fax  + ',' + addressString  + ',' + lawyer.status  + ',' + lawyer.history + "\n"
        
        csv = csv.concat(asString)
      })
      
      download(csv)
    }

    const lawyerRows = data.map((lawyer: Lawyer, index: number) => {

        let contactInfo = <ContactInformation contact={lawyer.contact} />

        if(searchTerm){

          if(searchTerm != lawyer.lastName 
            && searchTerm != lawyer.firstName 
            && searchTerm != lawyer.contact.city
            ){
              return;
          }
        }

        lawyersForExport.push(lawyer);

        return <LawyerRow 
            firstName={lawyer.firstName}
            lastName={lawyer.lastName}
            firm={lawyer.firm}
            contact={contactInfo}
            status={lawyer.status}
            history={lawyer.history}>
        </LawyerRow>
    })

    const sort = (column: string) => {
      const temp = [...data]; //This is some of the most disgusting shit I've ever seen, that I have to COPY the contents of the entire array before sorting it
                              //in order for it to re-render. 
      const sorted = temp.sort((a, b) => {

        let aField
        let bField

        if(column == 'lastName'){
          aField = a.lastName
          bField = b.lastName
        }
        else if(column == 'firstName'){
          aField = a.firstName
          bField = b.firstName
        }
        else if(column == 'firm'){
          aField = a.firm
          bField = b.firm
        }
        else if(column == 'status'){
          aField = a.status
          bField = b.status
        }
        else{
          return
        }

        console.log('sorting by: ', column)
        //negative = a before b
        //positive = b before a
        //0 = equal
        for(let i = 0; i < aField.length; i++){
          if(aField[i] && bField[i]){
            if(aField[i] > bField[i]){
              return 1
            }

            if(bField[i] > aField[i]){
              return -1
            }

            continue
          }else{
            if(aField[i]){
              return 1
            }
            if(bField[i]){
              return -1
            }
            return 0
          }
        }
        return 1
      })

      setData(sorted)
    }

    return(
    <div className="w-full">
        <div id="button-container" className="flex flex-row justify-between mb-10">
            <div className="flex flex-row">
                <Input id="search-input" className="col-span-3 rounded-lg" type="text" placeholder="Name, City, Postal Code..." onInput={(e: Event) => {
                    setInput((e.target as HTMLInputElement).value)
                }}/>
                <Button className="ml-20 rounded-md hover:bg-primary-hover" id="search-button" onClick={search}>Search</Button>
            </div>
            {
              auth.user ?
              <SavedSearches setSearchTerm={setSearchTerm}/>
              :
              <div></div>
            }
            <div className="flex flex-row items-center">
              <Button variant="outline" onClick={exportToFile}>Export to CSV</Button>
              {auth.user ? <ExportTypes /> : <div></div>}
            </div>
            <ExportControls exportFunction={exportToFile} />
        </div>
        <Table className={styles.table}>
          <TableHeader >
            <TableRow>
              {/*TODO: Abstract the TableHead into it's own component in order to more cleanly manage it's own state? aka 'sortDirection' and 'sorted'*/}
              <TableHead className="font-bold cursor-pointer" onClick={() => {
                sort('lastName')
              }}>Last Name</TableHead>
              <TableHead className="font-bold cursor-pointer" onClick={() => {
                sort('firstName')
              }}>First Name</TableHead>
              <TableHead className="font-bold cursor-pointer" onClick={() => {
                sort('firm')
              }}>Firm</TableHead>
              <TableHead className="font-bold">Contact</TableHead>
              <TableHead className="font-bold cursor-pointer" onClick={() => {
                sort('status')
              }}>Status</TableHead>
              <TableHead className="font-bold">History</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lawyerRows}
            {/* <LawyerRow firstName="Gregory" lastName="Evans" firm="Evans Pollock Family Law" contact="Please don't" status="Practising" history="Lots"/>
            <LawyerRow firstName="Richard" lastName="Pollock" firm="Evans Pollock Family Law" contact="" status="Practising" history="Not as much as Greg"/> */}
          </TableBody>
        </Table>
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                <PaginationNext href="#" />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    </div>
    )
}