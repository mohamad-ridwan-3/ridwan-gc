'use server'

import getBaseURL from "../getBaseURL"
import { cookies } from "next/headers"
import { session_login_name } from "@/src/utils"
import { ResultLogoutT } from "@/src/types/logout"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export default async function logout(): Promise<ResultLogoutT> {
    const cookieStore = cookies()
    const auth_session = cookieStore.get(session_login_name)
    if (auth_session?.value) {
        const baseURL = await getBaseURL()
        const response = await fetch(`${baseURL}/api/store/auth/logout`, {
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
    return {
        result: false,
        message: 'no-cookie',
        data: null
    }
}