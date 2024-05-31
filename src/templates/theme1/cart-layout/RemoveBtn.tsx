'use client'

import Iconify from "@/src/components/Iconify"
import { useAppDispatch } from "@/src/hooks/redux"
import deleteCartItem from "@/src/lib/server-actions/cart/deleteCartItem"
import getListCart from "@/src/lib/server-actions/cart/getListCart"
import { addCart } from "@/src/store/cart/cartSlice"
import { CartsT, DataListCartT } from "@/src/types/cart"
import { Dispatch, SetStateAction } from "react"
import toast from "react-hot-toast"

type Props = {
    carts: CartsT
    className: string
    setCartsData: Dispatch<SetStateAction<CartsT[]>>
    loading: boolean
    setLoading: Dispatch<SetStateAction<boolean>>
}

export default function RemoveBtn({
    carts,
    className,
    setCartsData,
    loading,
    setLoading
}: Props) {
    const dispatch = useAppDispatch()
    async function handleRemove(): Promise<void> {
        setLoading(true)
        const result = await deleteCartItem({
            cart_id: carts.cart_id,
            quantity: carts.quantity
        })
        if (result?.result) {
            const response = await getListCart()
            if (response?.result) {
                setCartsData(response.data.carts)
                dispatch(addCart(response.data))
                toast.dismiss()
                toast.success(response?.message)
                setLoading(false)
            } else {
                dispatch(addCart({} as DataListCartT))
                toast.dismiss()
                toast.error(result?.message ?? 'There is an error. Please try again')
                setLoading(false)
            }
        } else {
            toast.dismiss()
            toast.error(result?.message ?? 'There is an error. Please try again')
            setLoading(false)
        }
    }

    return (
        <div className="flex justify-end">
            <button
                className={`mr-2 font-normal font-inter text-sm ${loading ? 'text-gray-400 cursor-not-allowed' : 'text-[#737373] hover:text-gray-900'} transition-all ${className}`}
                onClick={handleRemove}
                disabled={loading}
            >
                <Iconify
                    icon="ph:trash-duotone"
                    className={loading ? 'cursor-not-allowed' : 'cursor-pointer'}
                />
            </button>
        </div>
    )
}