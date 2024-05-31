import { PaginationT } from "./products"

// shipping rate
export type ReqShippingRateT = {
    address_id: number
}

export type CouriersT = {
    logo: string
    name: string
    service:string
    service_id: string
    description: string
    price: string
}
export type DataShippingRateT = {
    weight: number
    weight_unit: string
    couriers: CouriersT[]
}

export type ResultShippingRateT = {
    result: boolean
    message: string
    data: DataShippingRateT
}

// create order
export type ReqCreateOrderT = {
    address_id: number
    service_id: string
    note: string
}

export type DataCreateOrderT = {
    redirect: string
    order_number: string
    total: string
}

export type ResultCreateOrderT = {
    result: boolean
    message: string
    data: DataCreateOrderT
}

// lists order
export type ListOrderItemsT = {
    image: string
    name: string
    variant: string
    price: string
    quantity: number
    total: string
}
export type ListsOrderT = {
    created_at: string
    order_number: string
    subtotal: string
    total: string
    status: 'Pending'
    items: ListOrderItemsT[]
}
export type DataListOrderT = {
    list: ListsOrderT[]
    pagination: PaginationT
}
export type ResultListsOrderT = {
    result: boolean
    message: string
    data: DataListOrderT
}

// tab lists Order History
export type LabelTabListT = 'Pending' | 'All' | 'Completed' | 'Delivery' | 'Processed by Seller' | 'Waiting for Payment'

export type TabListsOrderHistoryT = {
    label: LabelTabListT
    value: string
    data: ListsOrderT[]
}

// order details
export type ReqOrderDetailsT = {
    order_number: string
}

export type OrderDetailPaymentDataT = {
    method: string
    transaction_id: string | number | null
}

export type OrderDetailsShippingDataT = {
    courier_logo: string
    courier_name: string
    service_name: string
    tracking_number: string | number | null
    total: string
}

export type OrderDetailsAddressDataT = {
    name: string
    phone: string
    email: string
    address: string
    country: string
    state: string
    city: string
    postcode: string
    latitude: number | null | string
    longitude: number | null | string
}

export type DataOrderDetailsT = {
    created_at: string
    order_number: string
    status: 'Pending'
    subtotal: string
    total: string
    payment: OrderDetailPaymentDataT
    shipping: OrderDetailsShippingDataT
    address: OrderDetailsAddressDataT
    items: ListOrderItemsT[]
}

export type ResultOrderDetailsT = {
    result: boolean
    message: string
    data: DataOrderDetailsT
}