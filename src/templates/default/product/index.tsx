import CardClient from "@/src/lib/client/cards/CardClient"
import CldImageClient from "@/src/lib/client/cloudinary/image/CldImageClient"
import TypographyClient from "@/src/lib/client/typography/TypographyClienct"
import { ProuductT } from "@/src/types/products"
import { convertImageLoader, toBase64ImageLoader } from "@/src/utils/blurDataURLImg"
import Image from "next/image"

type Props = ProuductT & {
    loading?: string
    fetchPriority?: "high" | "low" | "auto",
    decoding?: "auto" | "async" | "sync"
}

export default function DefaultProduct({
    image,
    name,
    // discount,
    price,
    loading = 'lazy',
    fetchPriority,
    decoding
}: Props) {
    return (
        <CardClient
            props={{
                shadow: false,
                color: "white",
                children: <></>
            }}
        >
            <div className="relative">
                <Image
                    src={image}
                    alt="product storefront"
                    className="max-h-[200px] screen-d-lg:h-[250px] w-full object-contain"
                    height={250}
                    width={250}
                    sizes="100%"
                    loading={loading as 'lazy'}
                    decoding={decoding}
                    fetchPriority={fetchPriority}
                    placeholder="blur" 
                    blurDataURL={`data:image/svg+xml;base64,${toBase64ImageLoader(
                        convertImageLoader(700, 475)
                    )}`}
                />
                {/* <CldImageClient
                    deliveryType="fetch"
                    src={img}
                    alt="product storefront"
                    className="max-w-full max-h-full"
                    height={250}
                    width={250}
                    sizes="100%"
                    loading={loading}
                    decoding={decoding}
                    fetchPriority={fetchPriority}
                /> */}
            </div>
            <div className="text-center mt-4 hover:text-gray-800 transition-all text-black">
                <TypographyClient
                    props={{
                        variant: "h6",
                        className: "font-apple-system mb-0 text-[13px] !line-clamp-2",
                        children: <></>
                    }}
                >
                    {name}
                </TypographyClient>

                <div className="flex flex-wrap justify-center gap-1">
                    {/* {discount &&
                        <TypographyClient
                            props={{
                                className: "line-through font-apple-system font-normal mb-0 text-sm",
                                children: <></>
                            }}
                        >
                            {discount}
                        </TypographyClient>
                    } */}
                    <TypographyClient
                        props={{
                            className: "font-apple-system font-normal mb-0 text-sm",
                            children: <></>
                        }}
                    >
                        {price}
                    </TypographyClient>
                </div>
            </div>
        </CardClient>
    )
}