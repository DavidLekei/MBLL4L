type Contact = {
    phoneNumber: string
    address: string
    city: string
    province: string
    postalCode: string
    fax: string
    email: string
}

export type Lawyer = {
    firstName: string
    lastName: string
    firm: string
    contact: Contact
    status: string
    history: string
}