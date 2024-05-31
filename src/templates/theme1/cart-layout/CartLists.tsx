import { Dispatch, SetStateAction } from "react"
import TypographyClient from "@/src/lib/client/typography/TypographyClienct"
import { CartsT } from "@/src/types/cart"
import { convertImageLoader, toBase64ImageLoader } from "@/src/utils/blurDataURLImg"
import Image from "next/image"
import Link from "next/link"
import InputQuantity from "./InputQuantity"
import CardClient from "@/src/lib/client/cards/CardClient"

type PropsCartLists = {
    carts: CartsT[]
    setCartsData: Dispatch<SetStateAction<CartsT[]>>
    listLoadingUpdate: string[]
    setListLoadingUpdate: Dispatch<SetStateAction<string[]>>
}

export default function CartLists({
    carts,
    setCartsData,
    listLoadingUpdate,
    setListLoadingUpdate
}: PropsCartLists) {
    return (
        <ul className="mb-0 ml-0 space-y-4 mt-6 col-span-2">
            {carts.map((item, i) => (
                <li key={i}>
                    <CardClient
                        props={{
                            children: <></>,
                            className: 'flex w-full justify-between flex-col screen-tm1-sm:flex-row p-4 border list-none gap-2'
                        }}
                    >
                        <div className="flex gap-4">
                            <div className="min-w-[60px] sm:screen-tm1-sm:w-[100px] flex">
                                <Link href={`/products/${item.slug}`}>
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        height={126}
                                        width={126}
                                        sizes="100%"
                                        className="object-cover h-fit w-[60px] screen-tm1-sm:w-[100px] rounded-md border overflow-hidden"
                                        decoding={i > 2 ? "async" : "sync"}
                                        loading={i > 2 ? "lazy" : "eager"}
                                        placeholder="blur"
                                        blurDataURL={`data:image/svg+xml;base64,${toBase64ImageLoader(
                                            convertImageLoader(700, 475)
                                        )}`}
                                    />
                                </Link>
                            </div>
                            {/* <CldImageClient
                            deliveryType="fetch"
                            src={item.img}
                            alt="cart products storefront"
                            height={126}
                            width={126}
                            sizes="100%"
                            className="object-cover h-fit w-[126px] rounded-md border overflow-hidden"
                            decoding="async"
                            loading="lazy"
                        /> */}

                            <div className="flex flex-col mt-2 relative w-full screen-tm1-sm:w-auto">
                                <div className="flex flex-col justify-between space-y-2">
                                    <Link
                                        href={`/products/${item.slug}`}
                                    >
                                        <TypographyClient
                                            props={{
                                                variant: "h2",
                                                className: "text-[#404040] font-inter font-normal text-sm !line-clamp-2",
                                                children: <></>
                                            }}
                                        >
                                            {item.name}
                                        </TypographyClient>
                                    </Link>
                                    <TypographyClient
                                        props={{
                                            className: "text-[#171717] font-inter font-bold screen-tm1-sm:hidden",
                                            children: <></>
                                        }}
                                    >
                                        {item.total}
                                    </TypographyClient>
                                    {/* <TypographyClient
                                    props={{
                                        className: "text-[#737373] font-inter font-normal text-sm",
                                        children: <></>
                                    }}
                                >
                                    {item.category}
                                </TypographyClient> */}
                                    <TypographyClient
                                        props={{
                                            className: "text-[#737373] font-inter font-normal text-sm",
                                            children: <></>
                                        }}
                                    >
                                        {item.variant}
                                    </TypographyClient>
                                </div>
                                <div className="mt-5 space-y-2 justify-end flex">
                                    <div className="screen-tm1-sm:hidden">
                                        <InputQuantity
                                            cart={item}
                                            setCartsData={setCartsData}
                                            listLoadingUpdate={listLoadingUpdate}
                                            setListLoadingUpdate={setListLoadingUpdate}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="hidden flex-col justify-between screen-tm1-sm:flex">
                            <div className="flex justify-end">
                                <TypographyClient
                                    props={{
                                        className: "text-[#171717] font-inter font-bold",
                                        children: <></>
                                    }}
                                >
                                    {item.total}
                                </TypographyClient>
                            </div>
                            <div className="flex flex-col justify-end">
                                <InputQuantity
                                    cart={item}
                                    setCartsData={setCartsData}
                                    listLoadingUpdate={listLoadingUpdate}
                                    setListLoadingUpdate={setListLoadingUpdate}
                                />
                            </div>
                        </div>
                    </CardClient>
                </li>
            ))}
        </ul>
    )
}