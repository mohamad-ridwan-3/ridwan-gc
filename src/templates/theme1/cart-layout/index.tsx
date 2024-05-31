'use client'

import TypographyClient from "@/src/lib/client/typography/TypographyClienct";
import { CartsT, ResultGetListCartT } from "@/src/types/cart";
import CartLists from "./CartLists";
import ContentCheckout from "./ContentCheckout";
import NoListCart from "./NoListCart";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/src/hooks/redux";
import { addCart } from "@/src/store/cart/cartSlice";
import { useMediaQuery } from "usehooks-ts";
import ContentCheckoutMobile from "./ContentCheckoutMobile";

type PropsCartLists = {
    carts: ResultGetListCartT
    isHaveDefaultAddress: boolean
}

type Props = PropsCartLists

export default function CartTheme1({
    carts,
    isHaveDefaultAddress
}: Props) {
    const [cartsData, setCartsData] = useState<CartsT[]>(carts.data.carts)
    const [subtotal, setSubtotal] = useState<string>(carts.data.subtotal)
    const [listLoadingUpdate, setListLoadingUpdate] = useState<string[]>([])

    const dispatch = useAppDispatch()
    const cartStore = useAppSelector((state) => state.cart)

    useEffect(() => {
        dispatch(addCart(carts.data))
    }, [carts])

    useEffect(() => {
        if (cartStore.cart?.subtotal) {
            setSubtotal(cartStore.cart.subtotal)
        }
    }, [cartStore])

    const tablet = useMediaQuery('(min-width: 868px)')

    return (
        <div className="flex flex-col">
            <TypographyClient
                props={{
                    variant: "h1",
                    className: `text-[#171717] font-inter font-bold text-3xl ${cartsData.length > 0 ? 'border-b pb-12' : ''} mt-8`,
                    children: <></>
                }}
            >
                {cartsData.length > 0 ? 'Your Shopping Cart' : 'Your Shopping Cart is empty'}
            </TypographyClient>
            {cartsData.length > 0 ?
                <div className={`grid ${tablet ? 'grid-cols-3' : 'grid-cols-1'} gap-6`}>
                    <CartLists
                        carts={cartsData}
                        setCartsData={setCartsData}
                        listLoadingUpdate={listLoadingUpdate}
                        setListLoadingUpdate={setListLoadingUpdate}
                    />

                    {tablet ?
                        <ContentCheckout
                            subtotal={subtotal}
                            isHaveDefaultAddress={isHaveDefaultAddress}
                            listLoadingUpdate={listLoadingUpdate}
                        />
                        : <ContentCheckoutMobile
                            subtotal={subtotal}
                            isHaveDefaultAddress={isHaveDefaultAddress}
                            listLoadingUpdate={listLoadingUpdate}
                        />
                    }

                </div>
                :
                <NoListCart />
            }
        </div>
    )
}