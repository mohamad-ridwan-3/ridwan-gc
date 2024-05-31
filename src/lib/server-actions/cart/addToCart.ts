'use server'

import { ReqAddToCartDataT, ResultAddToCartT } from "@/src/types/cart"
import getBaseURL from "../getBaseURL"
import { cookies } from "next/headers"
import { session_login_name } from "@/src/utils"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export default async function addToCart(
    reqData: ReqAddToCartDataT
): Promise<ResultAddToCartT>{
    const cookieStore = cookies()
    const auth_session = cookieStore.get(session_login_name)
    const baseURL = await getBaseURL()
    const response = await fetch(`${baseURL}/api/store/cart/add`, {
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