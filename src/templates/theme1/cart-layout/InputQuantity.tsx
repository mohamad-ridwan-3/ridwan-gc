import { ChangeEvent, Dispatch, FocusEvent, SetStateAction, useEffect, useMemo, useState } from "react";
import Iconify from "@/src/components/Iconify";
import TextInput from "@/src/components/inputs/TextInput";
import ButtonClient from "@/src/lib/client/buttons/ButtonClient";
import TypographyClient from "@/src/lib/client/typography/TypographyClienct";
import { CartsT } from "@/src/types/cart";
import { regexCardNumber } from "@/src/utils";
import RemoveBtn from "./RemoveBtn";
import updateCartItem from "@/src/lib/server-actions/cart/updateCartItem";
import toast from "react-hot-toast";
import getListCart from "@/src/lib/server-actions/cart/getListCart";
import { useAppDispatch } from "@/src/hooks/redux";
import { addCart } from "@/src/store/cart/cartSlice";

type Props = {
    cart: CartsT
    setCartsData?: Dispatch<SetStateAction<CartsT[]>>
    listLoadingUpdate: string[]
    setListLoadingUpdate: Dispatch<SetStateAction<string[]>>
}

type ValueT = {
    value: string
    action: 'input' | 'btn' | 'none'
}

export default function InputQuantity({
    cart,
    setCartsData,
    listLoadingUpdate,
    setListLoadingUpdate
}: Props) {
    const [loading, setLoading] = useState<boolean>(false)
    const [value, setValue] = useState<ValueT>({
        value: `${cart.quantity}`,
        action: 'none'
    })

    const dispatch = useAppDispatch()

    function removeListLoadingUpdate(): void {
        setListLoadingUpdate((prev) => {
            const removeList = prev.filter(cart_id =>
                Number(cart_id) !== cart.cart_id
            )
            return removeList
        })
    }

    async function handleUpdateQuantity(): Promise<void> {
        setLoading(true)
        setListLoadingUpdate((prev) => [...prev, `${cart.cart_id}`])
        const result = await updateCartItem({
            cart_id: cart.cart_id,
            quantity: Number(value.value)
        })
        if (result?.result) {
            const result = await getListCart()
            if (result?.result) {
                toast.dismiss()
                toast.success(result?.message ?? 'Cart updated.')
                dispatch(addCart(result.data))
                if (setCartsData) {
                    setCartsData(result.data.carts)
                }
            } else {
                toast.dismiss()
                toast.error(result.message ?? 'There is an error. Please try again')
            }
            setLoading(false)
            removeListLoadingUpdate()
        } else {
            toast.dismiss()
            toast.error(result.message ?? 'There is an error. Please try again')
            setLoading(false)
            removeListLoadingUpdate()
        }
    }

    useEffect(() => {
        if (
            value.action === 'input' &&
            Number(value.value) > 0 &&
            Number(value.value) <= cart.stock
        ) {
            const debounce = setTimeout(() => {
                handleUpdateQuantity()
            }, 1000)
            return () => clearTimeout(debounce)
        } else if (value.action === 'btn') {
            handleUpdateQuantity()
        }
    }, [value])

    function clickPlus(): void {
        setValue({
            value: `${Number(value.value) + 1}`,
            action: 'btn'
        })
    }

    function clickMinus(): void {
        setValue({
            value: `${Number(value.value) - 1}`,
            action: Number(value.value) - 1 <= cart.stock ? 'btn' : 'none'
        })
    }

    const isDisabledBtnMinus = useMemo((): boolean => {
        if (Number(value.value) < 2) {
            return true
        } else if (Number(value.value) < 1) {
            return false
        }
        return false
    }, [
        cart,
        value
    ])
    const isDisabledBtnPlus = useMemo((): boolean => {
        if (Number(value.value) >= cart.stock) {
            return true
        }
        return false
    }, [
        cart,
        value
    ])

    function onChange(e: ChangeEvent<HTMLInputElement>): void {
        if (
            e.target.value.length > 0 &&
            e.target.value.length <= 5 &&
            regexCardNumber.test(e.target.value
            )) {
            let newValue = ''
            const value = e.target.value
            if (value.length === 2 && value.substr(0, 1) === '0') {
                newValue = value.substr(1)
            } else {
                newValue = e.target.value
            }
            setValue({
                value: newValue,
                action: 'input'
            })
        } else if (!e.target.value) {
            setValue({
                value: '0',
                action: 'input'
            })
        }
    }

    const errMessageQty = useMemo((): string | undefined => {
        if (value.value === '0') {
            return 'Minimum 1'
        } else if (Number(value.value) > cart?.stock) {
            return `Maximum purchase ${cart.stock}`
        }
    }, [value, cart])

    function onBlur(e: FocusEvent<HTMLInputElement>): void {
        if (value.value === '0' || Number(value.value) === cart?.quantity) {
            setValue({
                value: `${cart.quantity}`,
                action: 'none'
            })
            return
        } else if (Number(value.value) > cart?.stock) {
            setValue({
                value: `${cart.quantity}`,
                action: 'none'
            })
            return
        }
        setValue({
            value: value.value,
            action: 'input'
        })
    }

    return (
        <div>
            <div className="flex items-center screen-tm1-sm:space-x-3">
                {setCartsData &&
                    <RemoveBtn
                        carts={cart}
                        className='flex'
                        setCartsData={setCartsData}
                        loading={loading}
                        setLoading={setLoading}
                    />
                }
                <div className="relative items-center w-fit">
                    <ButtonClient
                        props={{
                            variant: 'text',
                            children: <></>,
                            size: 'sm',
                            className: '!absolute left-1 p-0 z-10 mt-[0.4rem] w-fit',
                            onClick: clickMinus,
                            disabled: isDisabledBtnMinus || loading || cart.stock === 0,
                        }}
                    >
                        <Iconify
                            icon="clarity:minus-line"
                        />
                    </ButtonClient>
                    <TextInput
                        type="tel"
                        classInput="!w-[6.5rem] text-center !px-[2rem]"
                        containerProps="!min-w-0"
                        onChange={onChange}
                        value={value.value}
                        isDisabledInput={loading || cart.stock === 0}
                        onBlur={onBlur}
                    />
                    <ButtonClient
                        props={{
                            variant: 'text',
                            children: <></>,
                            size: 'sm',
                            className: '!absolute p-0 z-10 top-0 right-1 mt-[0.4rem] w-fit',
                            onClick: clickPlus,
                            disabled: isDisabledBtnPlus || loading || cart.stock === 0
                        }}
                    >
                        <Iconify
                            icon="basil:plus-solid"
                        />
                    </ButtonClient>
                </div>
            </div>
            <div className="flex justify-end">
                {cart.stock === 0 ?
                    <TypographyClient
                        title="Item sold out"
                        props={{
                            children: <></>,
                            className: 'text-xs font-inter text-red-600 font-normal text-start mt-1'
                        }}
                    />
                    : (
                        <>
                            {errMessageQty &&
                                <TypographyClient
                                    title={errMessageQty}
                                    props={{
                                        children: <></>,
                                        className: 'text-xs font-inter text-red-600 font-normal text-start mt-1'
                                    }}
                                />
                            }
                        </>
                    )}
            </div>
        </div>
    )
}