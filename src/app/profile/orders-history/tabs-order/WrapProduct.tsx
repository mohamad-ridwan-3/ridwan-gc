import Iconify from "@/src/components/Iconify";
import ButtonClient from "@/src/lib/client/buttons/ButtonClient";
import TypographyClient from "@/src/lib/client/typography/TypographyClienct";
import Product from "../Product";
import { ListOrderItemsT } from "@/src/types/order";
import Link from "next/link";
import dayjs from "dayjs";
import CardClient from "@/src/lib/client/cards/CardClient";
import { useMediaQuery } from "usehooks-ts";

type Props = {
    order_number: string
    status: 'Pending'
    items: ListOrderItemsT[]
    total: string
    subtotal: string
    created_at: string
}

export default function WrapProduct({
    order_number,
    status,
    items,
    total,
    subtotal,
    created_at
}: Props) {
    const localizedFormat = require('dayjs/plugin/localizedFormat')
    dayjs.extend(localizedFormat)
    const miniMobile = useMediaQuery('(max-width: 320px)')
    return (
        <CardClient
            props={{
                className: 'px-3 py-4 border',
                children: <></>
            }}
        >
            <div className="flex items-center justify-between border-b mb-2 pb-2 space-x-1">
                <div className="flex items-center">
                    {!miniMobile &&
                        <div className="h-[35px] w-[35px]">
                            <Iconify
                                icon="lets-icons:order-duotone"
                                className="h-[35px] w-[35px]"
                            />
                        </div>
                    }
                    <div>
                        <Link href={`/profile/orders-history/${order_number}`}>
                            <ButtonClient
                                props={{
                                    children: <></>,
                                    variant: 'text',
                                    size: 'sm',
                                    className: 'p-1'
                                }}
                            >
                                <div className="flex items-center">
                                    <TypographyClient
                                        title={order_number}
                                        props={{
                                            children: <></>,
                                            className: 'font-inter font-bold text-[#171717] text-xs screen-tm1-sm:text-sm'
                                        }}
                                    />
                                    <Iconify
                                        icon="ep:arrow-right"
                                        height={15}
                                        width={15}
                                    />
                                </div>
                            </ButtonClient>
                        </Link>
                        <TypographyClient
                            props={{
                                children: <></>,
                                className: 'font-inter text-xs text-[#737373] font-normal ml-1'
                            }}
                        >
                            {dayjs(created_at).format('LLLL')}
                        </TypographyClient>
                    </div>
                </div>
                <div className="bg-[#171717bd] px-1.5 py-1 rounded-sm">
                    <TypographyClient
                        title={status}
                        props={{
                            children: <></>,
                            className: 'font-inter font-semibold text-white text-xs'
                        }}
                    />
                </div>
            </div>
            {items.map(((product, iProduct) => (
                <Product
                    key={iProduct}
                    image={product.image}
                    name={product.name}
                    total={product.total}
                    variant={product.variant}
                    quantity={product.quantity}
                />
            )))}
            <div className="flex justify-end mt-8">
                <div className="flex flex-col">
                    <div className="flex items-center">
                        <TypographyClient
                            props={{
                                children: <></>,
                                className: 'font-inter text-sm text-[#171717] font-normal'
                            }}
                        >
                            Total ({items.length} Item): <span className="font-bold text-[#171717]">{subtotal}</span>
                        </TypographyClient>
                    </div>
                </div>
            </div>
        </CardClient>
    )
}