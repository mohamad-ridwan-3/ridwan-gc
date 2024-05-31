'use server'

import { headers } from "next/headers";

export default async function getBaseURL() {
    const headersList = headers();
    const hostname = headersList.get('x-forwarded-host')

    if (
        process.env.NODE_ENV === 'development' ||
        (process.env.NODE_ENV === 'production' && hostname?.includes('localhost')) ||
        hostname === 'ridwan-storefront.vercel.app'
    ) {
        return 'https://wahyudi.ezbix.com'
    }
    return `https://${hostname}`
}