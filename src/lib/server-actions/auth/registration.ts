'use server'

import { revalidatePath } from "next/cache"
import getBaseURL from "../getBaseURL"

export default async function registration(prevData: any, formData: FormData) {
    const name = `${formData.get('firstName')} ${formData.get('lastName')}`
    const formDataUrlEncoded = new URLSearchParams()
    formDataUrlEncoded.append('name', name)
    formDataUrlEncoded.append('phone', `${formData.get('phone')}`)
    formDataUrlEncoded.append('email', `${formData.get('email')}`)
    formDataUrlEncoded.append('password', `${formData.get('password')}`)
    formDataUrlEncoded.append('password_confirmation', `${formData.get('password_confirmation')}`)

    const baseURL: string = await getBaseURL()

    try {
        const response = await fetch(`${baseURL}/api/store/auth/register`, {
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