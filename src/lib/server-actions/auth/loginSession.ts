'use server'

import { session_login_name } from '@/src/utils'
import { cookies } from 'next/headers'

const bearer = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3IiOiJyaWR3YW4iLCJteURyZWFtIjoibXlGdXR1cmUgOikiLCJpYXQiOjE3MDEwODQzNTJ9.FmAWPP_d4-DPHhvzAH3Cq4ax7Q77ILSkl-6-Y2FOkb4'

async function getSession(auth_session: string): Promise<any> {
    try {
        const response = await fetch('https://pendataan-pustakawan.cyclic.app/users/auth-session', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${bearer}`
            },
            body: JSON.stringify({
                token: auth_session
            })
        })
        const result = await response.json()
        return result
    } catch (error) {
        return error
    }
}

export default async function loginSession() {
    const cookieStore = cookies()
    const auth_session = cookieStore.get(session_login_name)
    if (!auth_session?.value) {
        return {}
    }

    const user = await getSession(`${auth_session?.value}`)
    if (user?.status !== 200) {
        return {}
    }
    return user
}