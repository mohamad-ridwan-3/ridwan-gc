'use server'

import getBaseURL from "../getBaseURL"
import { ResultCollectionsT } from "@/src/types/navbar"

export default async function getListColletions(): Promise<ResultCollectionsT> {
    const baseURL = await getBaseURL()
    const response = await fetch(`${baseURL}/api/store/collections`, {
        cache: 'no-store',
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    })
    const result = await response.json()
    return result
}