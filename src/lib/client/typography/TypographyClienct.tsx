'use client'

import { Typography, TypographyProps } from "@material-tailwind/react";
import { ReactNode } from "react";

type Props = {
    props: TypographyProps
    title?: string
    children?: ReactNode
}

export default function TypographyClient({
    props,
    title,
    children
}: Props) {
    return (
        <Typography
            placeholder=""
            onPointerEnterCapture=""
            onPointerLeaveCapture=""
            {...props}
        >
            {children ? children : title}
        </Typography>
    )
}