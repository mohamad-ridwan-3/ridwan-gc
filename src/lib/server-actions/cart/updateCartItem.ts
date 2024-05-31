'use server'

import getBaseURL from "../getBaseURL"
import { cookies } from "next/headers"
import { session_login_name } from "@/src/utils"
import { ReqDeleteCartItemT, ResultDeleteCartItemT } from "@/src/types/cart"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export default async function updateCartItem(
    reqData: ReqDeleteCartItemT
): Promise<ResultDeleteCartItemT> {
    const cookieStore = cookies()
    const auth_session = cookieStore.get(session_login_name)
    if (auth_session?.value) {
        const baseURL = await getBaseURL()
        const response = await fetch(`${baseURL}/api/store/cart/update`, {
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
    return {} as ResultDeleteCartItemT
}