'use client'

import { ListCustomerAddressT } from "@/src/types/profile";
import ListAddress from "./ListAddress";
import { useState } from "react";

type Props = {
    customerAddress: ListCustomerAddressT[]
}

export default function ClientWrap({
    customerAddress: data
}: Props) {
    const [customerAddress, setCustomerAddress] = useState<ListCustomerAddressT[]>(data)

    return (
        <div className={`flex flex-col mt-8 ${customerAddress.length <= 2 ? 'items-center' : ''}`}>
            <ListAddress
                customerAddress={customerAddress}
                setCustomerAddress={setCustomerAddress}
            />
        </div>
    )
}