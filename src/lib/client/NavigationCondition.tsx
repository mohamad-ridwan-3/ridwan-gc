'use client'

import { usePathname } from "next/navigation"
import { ReactNode } from "react"

export default function NavigationCondition({ children }: { children: ReactNode }) {
    const pathname = usePathname()

    return (
        <>
            {
                (
                    !pathname.includes('checkout') &&
                    !pathname.includes('login') &&
                    !pathname.includes('registration')
                ) &&
                children
            }
        </>
    )
}