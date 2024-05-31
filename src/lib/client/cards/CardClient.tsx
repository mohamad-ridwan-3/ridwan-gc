'use client'

import { Card, CardProps } from "@material-tailwind/react";
import { ReactNode } from "react";

type Props = {
    children: ReactNode
    props?:CardProps
}

export default function CardClient({
    children,
    props
}: Props){
    return(
        <Card
            placeholder=""
            onPointerEnterCapture=""
            onPointerLeaveCapture=""
            {...props}
        >
            {children}
        </Card>
    )
}