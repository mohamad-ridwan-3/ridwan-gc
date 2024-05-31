import TypographyClient from "@/src/lib/client/typography/TypographyClienct";
import { convertImageLoader, toBase64ImageLoader } from "@/src/utils/blurDataURLImg";
import Image from "next/image";

type Props = {
    image: string
    name: string
    total: string
    variant: string
    quantity: number
}

export default function Product({
    image,
    name,
    total,
    variant,
    quantity
}: Props) {
    return (
        <div className="my-3">
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
                        <TypographyClient
                            props={{
                                className: 'font-semibold text-sm font-inter mb-0 text-[#171717]',
                                children: <></>
                            }}
                        >
                            {name}
                        </TypographyClient>
                        <TypographyClient
                            props={{
                                children: <></>,
                                className: 'font-normal font-inter text-xs text-[#737373] mb-0'
                            }}
                        >
                            {variant}
                        </TypographyClient>
                        <div className="flex items-center justify-between w-full">
                            <TypographyClient
                                props={{
                                    children: <></>,
                                    className: 'font-inter font-semibold text-xs mr-2 text-[#171717]'
                                }}
                            >
                                {total}
                            </TypographyClient>
                            <TypographyClient
                                title={`Quantity: ${quantity}`}
                                props={{
                                    children: <></>,
                                    className: 'font-inter text-xs font-semibold text-[#171717]'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}