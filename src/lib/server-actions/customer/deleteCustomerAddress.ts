'use server'

import { ReqDeleteCustomerAddressT, ResultDeleteCustomerAddressT } from "@/src/types/profile"
import { session_login_name } from "@/src/utils"
import { cookies } from "next/headers"
import getBaseURL from "../getBaseURL"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export default async function deleteCustomerAddress(
    reqData: ReqDeleteCustomerAddressT
): Promise<ResultDeleteCustomerAddressT> {
    const cookieStore = cookies()
    const auth_session = cookieStore.get(session_login_name)
    if (auth_session?.value) {
        const baseURL = await getBaseURL()
        const response = await fetch(`${baseURL}/api/store/address/delete`, {
            cache: 'no-store',
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth_session?.value}`
            },
            body: JSON.stringify(reqData)
        })
        const result = await response.json()
        if(result?.message?.includes('Unauthenticated')){
            cookieStore.delete(session_login_name)
            redirect('/login')
        }
        revalidatePath('/')
        return result
    }
    if(!auth_session?.value){
        redirect('/login')
    }
    return {} as ResultDeleteCustomerAddressT
}