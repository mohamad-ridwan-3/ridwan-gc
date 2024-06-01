import { NextResponse } from "next/server"
import type { NextRequest } from 'next/server'
import { cookies, headers } from "next/headers"
import { session_login_name, success_registration } from "./utils"

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)']
}

export async function middleware(request: NextRequest) {
    const headersList = headers()
    const hostname = headersList.get('x-forwarded-host')

    function getMainPathURL(): string {
        if (hostname?.includes('localhost')) {
            return '/'
        } else if (hostname?.includes('ezbix.com')) {
            return '/store/'
        }
        return '/'
    }

    const mainPathURL = getMainPathURL()

    const cookieStore = cookies()
    const auth_session = cookieStore.get(session_login_name)
    const auth_success_registration = cookieStore.get(success_registration)
    // successful registration
    if (
        request.url.includes('/success-registration') &&
        !auth_success_registration &&
        !auth_session?.value
    ) {
        const response = NextResponse.redirect(new URL(`${mainPathURL}login`, request.url))
        return response
    } else if (
        request.url.includes('/success-registration') &&
        !auth_success_registration &&
        auth_session?.value
    ) {
        const response = NextResponse.redirect(new URL(mainPathURL, request.url))
        return response
    } else if (
        request.url.includes('/success-registration') &&
        auth_success_registration
    ) {
        return NextResponse.next()
    }

    // login session
    if (
        !auth_session?.value &&
        (
            !request.url.includes('/login') ||
            !request.url.includes('/registration')
        )
    ) {
        if (request.url.includes('/login') || request.url.includes('/registration')) {
            return NextResponse.next()
        }
        if (
            request.url.includes('/cart') ||
            request.url.includes('/profile') ||
            request.url.includes('/checkout')
        ) {
            const response = NextResponse.redirect(new URL(`${mainPathURL}login`, request.url))
            return response
        }
        return NextResponse.next()
    } else if (
        auth_session?.value &&
        request.url.includes('/login') ||
        request.url.includes('/registration')
    ) {
        const response = NextResponse.redirect(new URL(mainPathURL, request.url))
        return response
    }

    return NextResponse.next()
}