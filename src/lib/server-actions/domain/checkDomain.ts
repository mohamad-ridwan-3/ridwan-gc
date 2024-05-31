import { headers } from "next/headers";

export async function checkDomain(): Promise<any> {
    const headersList = headers();
    const hostname = headersList.get('x-forwarded-host')
    const resultCheckDomain = await fetch(`https://${hostname}/api/check-domain`, {cache: 'no-store'})
    if (!resultCheckDomain.ok) {
        throw new Error('Failed to fetch domain')
    }
    return resultCheckDomain.json()
}