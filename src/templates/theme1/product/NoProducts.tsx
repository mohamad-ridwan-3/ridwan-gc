import ButtonClient from "@/src/lib/client/buttons/ButtonClient";
import TypographyClient from "@/src/lib/client/typography/TypographyClienct";
import { staticImages } from "@/src/utils";
import { convertImageLoader, toBase64ImageLoader } from "@/src/utils/blurDataURLImg";
import Image from "next/image";
import Link from "next/link";

type Props = {
    showBtnBack?: boolean
}

export default function NoProducts({
    showBtnBack = true
}: Props) {
    return (
        <div className="flex justify-center flex-col items-center w-full space-y-4">
            <Image
                src={`${staticImages}/icons/products/no-shopping-cart.png`}
                alt="no product"
                height={170}
                width={170}
                className="object-contain"
                placeholder="blur"
                fetchPriority="high"
                decoding="sync"
                blurDataURL={`data:image/svg+xml;base64,${toBase64ImageLoader(
                    convertImageLoader(700, 475)
                )}`}
            />
            <div className="max-w-[40rem] flex flex-col text-center space-y-2">
                <TypographyClient
                    title="Oops, No items available here!"
                    props={{
                        children: <></>,
                        as: 'h1',
                        className: 'font-inter font-bold text-2xl text-[#171717]'
                    }}
                />
                <TypographyClient
                    title="Let's look for other items available."
                    props={{
                        children: <></>,
                        className: 'font-inter font-normal text-[#737373]'
                    }}
                />
                {showBtnBack &&
                    <div className="pt-4">
                        <Link href="/">
                            <ButtonClient
                                title="Back"
                                props={{
                                    size: 'md',
                                    children: <></>,
                                    className: 'font-inter w-fit mx-auto'
                                }}
                            />
                        </Link>
                    </div>
                }
            </div>
        </div>
    )
}