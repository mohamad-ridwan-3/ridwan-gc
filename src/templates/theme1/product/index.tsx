import CardClient from "@/src/lib/client/cards/CardClient";
import CldImageClient from "@/src/lib/client/cloudinary/image/CldImageClient";
import TypographyClient from "@/src/lib/client/typography/TypographyClienct";
import { ProuductT } from "@/src/types/products";
import { convertImageLoader, toBase64ImageLoader } from "@/src/utils/blurDataURLImg";
import Image from "next/image";

type Props = ProuductT & {
    loading?: string
    fetchPriority?: "high" | "low" | "auto",
    decoding?: "auto" | "async" | "sync"
}

export default function ProductTheme1({
    name,
    image,
    price,
    loading = 'lazy',
    fetchPriority,
    decoding,
    has_discount
}: Props) {
    const bgImg = 'bg-[#fafafa]'

    return (
        <CardClient
            props={{
                shadow: false,
                color: "white",
                children: <></>
            }}
        >
            <div className={`relative`}>
                <Image
                    src={image}
                    alt="product storefront"
                    className="max-h-[200px] screen-tm1-lg:h-[250px] w-full object-contain"
                    height={250}
                    width={250}
                    sizes="100%"
                    loading={loading as 'lazy'}
                    fetchPriority={fetchPriority}
                    decoding={decoding}
                    placeholder="blur" blurDataURL={`data:image/svg+xml;base64,${toBase64ImageLoader(
                        convertImageLoader(700, 475)
                    )}`}
                />
                {/* <CldImageClient
                    deliveryType="fetch"
                    src={img}
                    alt="product storefront"
                    className="max-h-[390px] screen-tm1-sm:h-[390px] w-full object-contain"
                    height={390}
                    width={390}
                    sizes="100%"
                    loading={loading}
                    fetchPriority={fetchPriority}
                    decoding={decoding}
                /> */}
            </div>
            <div className="flex flex-col justify-between gap-2 text-[#171717] my-2">
                <TypographyClient
                    props={{
                        as: 'div',
                        className: "font-inter text-[13px] font-normal mb-0 !line-clamp-2",
                        children: <></>
                    }}
                >
                    {name}
                </TypographyClient>

                <div className="flex space-x-1">
                    {/* {discount &&
                        <TypographyClient
                            props={{
                                className: "line-through font-inter font-semibold text-sm mb-0",
                                children: <></>
                            }}
                        >
                            {discount}
                        </TypographyClient>
                    } */}
                    <TypographyClient
                        props={{
                            className: "font-inter font-bold text-[15px] mb-0",
                            children: <></>
                        }}
                    >
                        {price}
                    </TypographyClient>
                </div>
            </div>
            {/* <TypographyClient
                props={{
                    className: "font-inter text-xs text-[#737373] font-normal",
                    children: <></>
                }}
            >
                {category}
            </TypographyClient> */}
        </CardClient>
    )
}