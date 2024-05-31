'use server'

import { cookies } from "next/headers";
import getBaseURL from "../getBaseURL";
import { session_login_name } from "@/src/utils";
import { ReqUpdateCustomerAddressT, ResultAddCustomerAddressT } from "@/src/types/profile";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function updateCustomerAddress(reqData: ReqUpdateCustomerAddressT): Promise<ResultAddCustomerAddressT> {
    const cookieStore = cookies()
    const auth_session = cookieStore.get(session_login_name)
    const baseURL: string = await getBaseURL()
    if (auth_session?.value) {
        const response = await fetch(`${baseURL}/api/store/address/update`, {
            cache: 'no-store',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth_session.value}`
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
    } else {
        return {} as ResultAddCustomerAddressT
    }
}