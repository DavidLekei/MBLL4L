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
  
import LawyerRow from './lawyerrow'
import { Lawyer } from "@/types/lawyer"
import { useEffect, useState } from "react"
import {getLawyers} from '../../api/api'

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

    const [data, setData] = useState(null);

    useEffect(
      () => {
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

    const lawyers = data.map((lawyer: Lawyer, index: number) => {

        console.log('searchTerm: ' + props.searchTerm)

        let contactInfo = <ContactInformation contact={lawyer.contact} />

        if(props.searchTerm){

          if(props.searchTerm != lawyer.lastName 
            && props.searchTerm != lawyer.firstName 
            && props.searchTerm != lawyer.contact.city
            ){
              console.log('lastName: ', lawyer.lastName)
              return;
          }
        }

        // if(props.filter){
        //   if(lawyer.lastName !==  )
        // }

        return <LawyerRow 
            firstName={lawyer.firstName}
            lastName={lawyer.lastName}
            firm={lawyer.firm}
            contact={contactInfo}
            status={lawyer.status}
            history={lawyer.history}>
        </LawyerRow>
    })

    return(
    <div>
        <Table className={styles.table}>
          <TableHeader >
            <TableRow>
              <TableHead className="font-bold">Last Name</TableHead>
              <TableHead className="font-bold">First Name</TableHead>
              <TableHead className="font-bold">Firm</TableHead>
              <TableHead className="font-bold">Contact</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="font-bold">History</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lawyers}
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