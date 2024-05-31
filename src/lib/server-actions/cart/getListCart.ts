'use server'

import getBaseURL from "../getBaseURL"
import { cookies } from "next/headers"
import { session_login_name } from "@/src/utils"
import { ResultGetListCartT } from "@/src/types/cart"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export default async function getListCart(): Promise<ResultGetListCartT> {
    const cookieStore = cookies()
    const auth_session = cookieStore.get(session_login_name)
    if (auth_session?.value) {
        const baseURL = await getBaseURL()
        const response = await fetch(`${baseURL}/api/store/cart`, {
            cache: 'no-store',
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
    return {} as ResultGetListCartT
}