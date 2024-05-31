'use server'

import { cookies } from "next/headers";
import getBaseURL from "../getBaseURL";
import { session_login_name } from "@/src/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ReqCreateOrderT, ResultCreateOrderT } from "@/src/types/order";

export default async function createOrder(reqData: ReqCreateOrderT): Promise<ResultCreateOrderT> {
    const cookieStore = cookies()
    const auth_session = cookieStore.get(session_login_name)
    const baseURL: string = await getBaseURL()
    if (auth_session?.value) {
        const response = await fetch(`${baseURL}/api/store/order/create`, {
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
        return {} as ResultCreateOrderT
    }
}