'use server'

import { ResultListCustomerAddressT } from "@/src/types/profile"
import { session_login_name } from "@/src/utils"
import { cookies } from "next/headers"
import getBaseURL from "../getBaseURL"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export default async function getListCustomerAddress(): Promise<ResultListCustomerAddressT> {
    const cookieStore = cookies()
    const auth_session = cookieStore.get(session_login_name)
    if (auth_session?.value) {
        const baseURL = await getBaseURL()
        const response = await fetch(`${baseURL}/api/store/address`, {
            cache: 'no-cache',
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth_session?.value}`
            }
        })
        const result = await response.json()
        if(result?.message?.includes('Unauthenticated')){
            cookieStore.delete(session_login_name)
            redirect('/login')
        }
        revalidatePath('/')
        return result
    }
    return {} as ResultListCustomerAddressT
}