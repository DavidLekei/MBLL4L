import styles from "../../app/page.module.css"

import {
    TableCell,
    TableRow,
  } from "@/components/ui/table"

export default function LawyerRow(props: any){
    return(
        <TableRow className={styles.tableRow}>
            <TableCell>{props.firstName}</TableCell>
            <TableCell>{props.lastName}</TableCell>
            <TableCell>{props.firm}</TableCell>
            <TableCell>{props.contact}</TableCell>
            <TableCell>{props.status}</TableCell>
            <TableCell>{props.history}</TableCell>
        </TableRow>
    )
}