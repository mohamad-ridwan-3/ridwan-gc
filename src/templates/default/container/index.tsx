import { ReactNode } from "react"

type Props = {
    children: ReactNode
    className?: string
}

export default function DefaultContainer({
    children,
    className
}: Props){
    const widthResponsive = 'w-full px-4 screen-d-sm:w-[540px] screen-d-md:w-[720px] screen-d-lg:w-[960px]'
    return (
        <div className={`flex justify-center w-screen ${className}`}>
            <div className={`w-[80rem] max-w-7xl px-8`}>
                {children}
            </div>
        </div>
    )
}