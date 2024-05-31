'use server'

import { revalidatePath } from "next/cache";
import getBaseURL from "../getBaseURL";

export default async function login(prevData: any, formData: FormData) {
    const formDataUrlEncoded = new URLSearchParams()
    formDataUrlEncoded.append('email', `${formData.get('email')}`)
    formDataUrlEncoded.append('password', `${formData.get('password')}`)

    const baseURL: string = await getBaseURL()

    try {
        const response = await fetch(`${baseURL}/api/store/auth/login`, {
            cache: 'no-store',
            method:'POST',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formDataUrlEncoded.toString()
        })
        const result = await response.json()
        revalidatePath('/')
        return result
    } catch (error) {
        return error
    }
}