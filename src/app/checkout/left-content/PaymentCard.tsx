import Iconify from "@/src/components/Iconify"
import { PaymentMethodsT } from "@/src/types/checkout"
import { Card, Typography } from "@material-tailwind/react"
import Image from "next/image"
import { CouriersT } from "@/src/types/order"

type PaymentMethodProps = {
    data: PaymentMethodsT | CouriersT
    onClick: (courier: PaymentMethodsT | CouriersT)=>void
} & PaymentMethodsT

export default function PaymentCard({
    icon,
    name,
    image,
    data,
    onClick
}: PaymentMethodProps) {
    return (
        <Card
            placeholder=""
            onPointerEnterCapture=""
            onPointerLeaveCapture=""
            className={`cursor-pointer shadow-sm rounded-md border-2 p-3 transition-all ${data.name === name ? 'text-[#c2890e] border-[#c2890e]' : 'hover:text-gray-800 text-gray-600'}`}
            onClick={()=>onClick(data)}
        >
            {icon &&
                <Iconify
                    icon={icon}
                    width={20}
                    height={20}
                    className="mb-1"
                />
            }
            {image &&
                <Image
                    src={image}
                    alt="payment card"
                    height={17}
                    width={17}
                    className="object-contain mb-1"
                />
            }
            <Typography
                placeholder=""
                onPointerEnterCapture=""
                onPointerLeaveCapture=""
                className="font-inter text-sm font-semibold mb-0"
            >
                {name}
            </Typography>
        </Card>
    )
}