'use client'

import { Carousel, CarouselProps } from "@material-tailwind/react";
import { ReactNode } from "react";

type Props = {
    children: ReactNode
    props: CarouselProps
}

export default function CarouselClient({
    children,
    props
}: Props) {
    return (
        <Carousel
            placeholder={""}
            onPointerEnterCapture=""
            onPointerLeaveCapture=""
            {...props}
        >
            {children}
        </Carousel>
    )
}