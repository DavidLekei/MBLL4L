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
  
import Lawyer from './lawyer'

export default function Lawyers(){
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
            <Lawyer firstName="Greg" lastName="Evans" firm="Evans Pollock Family Law" contact="Please don't" status="Practising" history="Lots"/>
            <Lawyer firstName="Richard" lastName="Pollock" firm="Evans Pollock Family Law" contact="" status="Practising" history="Not as much as Greg"/>
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