'use client'

import { Spinner, SpinnerProps } from "@material-tailwind/react";

type Props = {
    props: SpinnerProps
}

export default function SpinnerClient({
    props
}: Props) {
    return (
        <Spinner
            onPointerEnterCapture=""
            onPointerLeaveCapture=""
            {...props}
        />
    )
}