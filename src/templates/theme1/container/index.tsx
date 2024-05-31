import { ReactNode } from "react"

type Props = {
    children: ReactNode
    className?: string
    centerClassName?: string
}

export default function ContainerTheme1({
    children,
    className,
    centerClassName
}: Props){
    return (
        <div className={`flex justify-center w-screen ${className}`}>
            <div className={`w-[80rem] max-w-7xl px-8 ${centerClassName}`}>
                {children}
            </div>
        </div>
    )
}