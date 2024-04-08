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

    console.log("lawyers!")

    const lawyers = props.data.map((lawyer: Lawyer, index: number) => {

        let contactInfo = <ContactInformation contact={lawyer.contact} />

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
              <TableHead>Last Name</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Firm</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>History</TableHead>
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