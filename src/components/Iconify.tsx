'use client'

import { Icon } from "@iconify/react/dist/iconify.js";

type Props = {
    icon: string
    className?: string
    height?:number
    width?: number
    color?: string
    click?: ()=>void
}

export default function Iconify({
    icon,
    className = 'cursor-pointer',
    height = 26,
    width = 26,
    color,
    click
}: Props) {
    return (
        <Icon
            icon={icon}
            className={className}
            height={height}
            width={width}
            color={color}
            onClick={click}
        />
    )
}