import { Typography } from "@material-tailwind/react"

export default function Title({
    title,
    className
}: {
    title: string
    className?: string
}) {
    return (
        <Typography
            placeholder=""
            onPointerEnterCapture=""
            onPointerLeaveCapture=""
            className={`text-[#171717] font-bold font-inter ${className}`}
        >

            {title}
        </Typography>
    )
}