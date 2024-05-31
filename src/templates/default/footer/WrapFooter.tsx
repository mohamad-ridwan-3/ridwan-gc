'use client'

import { TemplateDirT } from "@/src/types/template";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type Props = TemplateDirT & {
    children: ReactNode
}

export default function WrappFooter({
    templateDir,
    children
}: Props) {
    const pathname = usePathname()

    return (
        <div className="flex justify-center w-screen">
            <div className={`w-[80rem] max-w-7xl px-8`}>
                <footer className={`flex flex-col justify-center w-full ${pathname.includes('/products/') ? 'pb-28 screen-d-md:pb-0' : ''}`}>
                    {children}
                </footer>
            </div>
        </div>
    )
}