'use server'

import { cookies } from "next/headers";
import getBaseURL from "../getBaseURL";
import { session_login_name } from "@/src/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ResultListsOrderT } from "@/src/types/order";

export default async function listsOrder(
    params: string
): Promise<ResultListsOrderT> {
    const cookieStore = cookies()
    const auth_session = cookieStore.get(session_login_name)
    const baseURL: string = await getBaseURL()
    if (auth_session?.value) {
        const response = await fetch(`${baseURL}/api/store/order${params}`, {
            cache: 'no-store',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth_session.value}`
            }
        })
        const result = await response.json()
        if(result?.message?.includes('Unauthenticated')){
            cookieStore.delete(session_login_name)
            redirect('/login')
        }
        revalidatePath('/')
        return result
    } else {
        return {} as ResultListsOrderT
    }
}