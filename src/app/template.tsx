'use client'

import { ReactNode, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { usePathname, useRouter } from "next/navigation"
import getListCart from "../lib/server-actions/cart/getListCart"
import { addCart } from "../store/cart/cartSlice"
import { DataListCartT } from "../types/cart"

type Props = {
    children: ReactNode
}

export default function Template({ children }: Props) {
    const template = useAppSelector(state => state.template)
    const dispatch = useAppDispatch()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        if (template.templateName === 'failed' && pathname !== '/404') {
            router.push('/404')
        }
    }, [template])

    useEffect(() => {
        // development mode
        if (typeof window !== 'undefined' &&
            window.location.hostname.includes('localhost') &&
            pathname === '/'
        ) {
            router.push('/')
        }

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }, [pathname])

    async function handleGetListCart():Promise<void>{
        const response = await getListCart()
        if(response?.result){
            dispatch(addCart(response.data))
        }else {
            dispatch(addCart({} as DataListCartT))
        }
    }

    useEffect(()=>{
        if(
            pathname !== '/login' &&
            pathname !== '/registration' &&
            pathname !== '/registration/success-registration' &&
            pathname !== '/cart' &&
            pathname !== '/checkout'
        ){
            handleGetListCart()
        }
    }, [pathname])

    return (
        <>
            {children}
        </>
    )
}