// import { HostnameT } from "../types/hostname"

// export const getCurrentHostname = (): HostnameT | undefined => {
//     if (typeof window !== 'undefined') {
//         const hostname = window.location.hostname
//         return hostname.split('.')[0] as 'ridwan'
//     }
// }

// static image
// export const staticImages = process.env.NODE_ENV == 'production' ? 'https://api.ezbix.com/store/images' : '/store/images'
export const staticImages = '/images'

// regex
export const regexNumber = /^\d+$/
export const regexCardNumber = /^[\d\s]+$/
export const regexSpace = /\s/g
export const regexAlphabetic = /^[a-zA-Z]+$/
export const regexAlphabeticInsideOtherChar = /[A-Za-z]/g

// validate card number
export const validateCardNumber = (value: string): string => {
    const newValue = value.replace(regexSpace, '')
    let output = '';
    for (let i = 0; i < newValue.length; i++) {
        output += newValue[i];
        if ((i + 1) % 4 === 0 && i !== newValue.length - 1) {
            output += ' ';
        }
    }
    return output
}

// domain
export const mainDomain: string = `${process.env.NEXT_PUBLIC_MAIN_DOMAIN}`

// cookie
// login
export const session_login_name = 'access_token'
// success registration
export const success_registration = 'success_registration'

// formatter currency
export function formatterCurrency(
    currency: 'MYR' | 'IDR'
):Intl.NumberFormat{
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
    })
    return formatter
}