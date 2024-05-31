import TypographyClient from "@/src/lib/client/typography/TypographyClienct";
import { CartsT } from "@/src/types/cart";
import { convertImageLoader, toBase64ImageLoader } from "@/src/utils/blurDataURLImg";
import { Typography } from "@material-tailwind/react";
import Image from "next/image";

type Props = {
    data: CartsT
}

export default function ProductSummary({
    data
}: Props) {
    const {
        image,
        name,
        variant,
        quantity,
        total
    } = data
    return (
        <div className="space-y-3.5">
            <div
                className="flex w-full justify-between"
            >
                <div className="flex gap-4 w-full">
                    <div className="w-[60px]">
                        <Image
                            src={image}
                            alt="product"
                            height={126}
                            width={126}
                            className="border rounded-md bg-white w-full object-contain"
                            placeholder="blur"
                            blurDataURL={`data:image/svg+xml;base64,${toBase64ImageLoader(
                                convertImageLoader(700, 475)
                            )}`}
                        />
                    </div>

                    <div className="space-y-2 w-full">
                        <Typography
                            onPointerEnterCapture=""
                            onPointerLeaveCapture=""
                            placeholder=""
                            className="font-normal text-sm font-inter mb-0"
                        >
                            {name}
                        </Typography>
                        <Typography
                            onPointerEnterCapture=""
                            onPointerLeaveCapture=""
                            placeholder=""
                            className="font-normal font-inter text-xs text-[#737373] mb-0"
                        >
                            {variant}
                        </Typography>
                        <div className="flex items-center justify-between w-full">
                            <Typography
                                onPointerEnterCapture=""
                                onPointerLeaveCapture=""
                                placeholder=""
                                className="font-inter font-bold text-sm mr-2"
                            >
                                {total}
                            </Typography>
                            <TypographyClient
                                title={`Quantity ${quantity}`}
                                props={{
                                    children: <></>,
                                    className: 'font-inter text-xs font-semibold'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-px w-full border-t"></div>
        </div>
    )
}