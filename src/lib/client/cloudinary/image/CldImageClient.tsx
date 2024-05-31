'use client'

import { CldImage } from "next-cloudinary";

type Props = {
    src?: string
    alt?: string
    className?: string
    height?: number
    width?: number
    sizes?: string
    loading?: string
    deliveryType?: string
    fetchPriority?: "high" | "low" | "auto",
    decoding?: "auto" | "async" | "sync"
}

export default function CldImageClient({
    src,
    alt,
    className,
    height,
    width,
    sizes,
    loading,
    deliveryType = 'fetch',
    fetchPriority,
    decoding
}: Props) {
    return (
        <CldImage
            deliveryType={deliveryType}
            src={src as string}
            alt={`${alt}`}
            className={className}
            height={height}
            width={width}
            sizes={sizes}
            loading={loading as 'lazy'}
            fetchPriority={fetchPriority}
            decoding={decoding}
        />
    )
}