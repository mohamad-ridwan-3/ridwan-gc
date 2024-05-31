export type CardProfileInfoT = {
    title: string
    desc?: string
    btnName?: string
    slug?: string
    icon: string
    value?: string
    label: string
}

// result list customer address
export type ListCustomerAddressT = {
    id: number
    type: string
    name: string
    phone: string
    address: string
    email: string
    country: string
    short_country: string
    short_state: string
    state: string
    city: string
    postcode: string
    is_default: number
}

export type ResultListCustomerAddressT = {
    result: boolean
    message: string
    data: ListCustomerAddressT[]
}

// delete customer address
export type ReqDeleteCustomerAddressT = {
    id: number
}

export type ResultDeleteCustomerAddressT = {
    result: boolean
    message: string
    data: null
}

// add customer address
export type ReqAddCustomerAddressT= {
    type: string
    name: string
    phone: string
    email: string
    address: string
    country: string
    short_country: string
    state: string
    short_state: string
    city: string
    postcode: string
    is_default: boolean
}

export type ResultAddCustomerAddressT = {
    result: boolean
    message: string
    data: null
}

// update customer address
export type ReqUpdateCustomerAddressT= {
    id: number
    type: string
    name: string
    phone: string
    email: string
    address: string
    country: string
    short_country: string
    state: string
    short_state: string
    city: string
    postcode: string
    is_default: boolean
}