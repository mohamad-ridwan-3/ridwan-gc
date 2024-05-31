'use client'

import { ChangeEvent, FormEvent, useState } from "react"
import Search from "./Search"
import { ResultListsOrderT, TabListsOrderHistoryT } from "@/src/types/order"
import TabsOrder from "./tabs-order"

type Props = {
    data: ResultListsOrderT
    pending: TabListsOrderHistoryT[]
    all: TabListsOrderHistoryT[]
    completed: TabListsOrderHistoryT[]
    delivery: TabListsOrderHistoryT[]
    processedBySeller: TabListsOrderHistoryT[]
    waitingForPayment: TabListsOrderHistoryT[]
}

export default function ClientWrap({
    data,
    pending,
    all,
    completed,
    waitingForPayment,
    processedBySeller,
    delivery
}: Props) {
    const dataTabs = [...all, ...pending, ...waitingForPayment, ...processedBySeller, ...delivery, ...completed]
    const [lists, setLists] = useState<TabListsOrderHistoryT[]>(dataTabs)
    const [searchValue, setSearchValue] = useState<string>('')

    function submitSearch(e: FormEvent<HTMLFormElement | HTMLButtonElement>): void {
        e.preventDefault()
        if (searchValue.trim()) {

        }
    }

    function handleSearch(e: ChangeEvent<HTMLInputElement>): void {
        setSearchValue(e.target.value)
    }

    return (
        <>
            <div className="flex justify-center mt-8 flex-col items-center space-y-3">
                <Search
                    submitSearch={submitSearch}
                    handleSearch={handleSearch}
                    searchValue={searchValue}
                />
            </div>
            <TabsOrder
                lists={lists}
            />
        </>
    )
}