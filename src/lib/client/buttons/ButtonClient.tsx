'use client'

import { Button, ButtonProps } from "@material-tailwind/react"
import { ReactNode } from "react"

type Props = {
    props: ButtonProps
    title?: string
    children?: ReactNode
}

export default function ButtonClient({
    props,
    title,
    children
}: Props) {
    return (
        <Button
            placeholder=""
            onPointerEnterCapture=""
            onPointerLeaveCapture=""
            {...props}
        >
            {children ? children : title}
        </Button>
    )
}