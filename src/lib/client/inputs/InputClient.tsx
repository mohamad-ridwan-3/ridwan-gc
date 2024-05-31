'use client'

import { Input, InputProps } from "@material-tailwind/react";

type Props = {
    props: InputProps
}

export default function InputClient({
    props
}: Props) {
    return (
        <Input
            onPointerEnterCapture=""
            onPointerLeaveCapture=""
            crossOrigin=""
            {...props}
        />
    )
}