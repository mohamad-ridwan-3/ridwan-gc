'use client'

import { ChangeEvent, useEffect, useMemo, useState } from "react"
import { AttributeValueT, DataVariantProductT, ResultProductDetailT, SelectVariantT } from "@/src/types/products"
import ProductContent from "./product-content/ProductContent"
import ProductPreview from "./product-preview"
import AddToCart from "./add-to-cart/AddToCart"
import { formatterCurrency, regexAlphabeticInsideOtherChar, regexCardNumber, session_login_name } from "@/src/utils"
import addToCart from "@/src/lib/server-actions/cart/addToCart"
import toast from "react-hot-toast"
import Cookies from 'js-cookie'
import { useRouter } from "next/navigation"
import getListCart from "@/src/lib/server-actions/cart/getListCart"
import { useAppDispatch } from "@/src/hooks/redux"
import { addCart } from "@/src/store/cart/cartSlice"
import AddToCartMobile from "./add-to-cart/AddToCartMobile"
import DetailVariants from "./product-content/variants/detail-variants"
import { useMediaQuery } from "usehooks-ts"
import Container from "@/src/components/container"

type Props = ResultProductDetailT & {
    handleSetAttribute: DataVariantProductT
}

export default function ProductDetailTheme1({
    result,
    message,
    data,
    handleSetAttribute
}: Props) {
    // console.log(handleSetAttribute)
    // if have_attribute : true
    const [dataVariants, setDataVariants] = useState(handleSetAttribute as DataVariantProductT)
    // set quantity
    const [quantity, setQuantity] = useState<string>('1')
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false)
    const [errResponseAddToCart, setErrResponseAddToCart] = useState<string>('')
    // detail variant
    const [showDetailVariant, setShowDetailVariant] = useState<boolean>(false)

    const desktop = useMediaQuery('(min-width: 1024px)')

    const dispatch = useAppDispatch()
    const router = useRouter()

    function clickFirstAttribute(value: string): void {
        const findAttribute = data.attribute.attribute.find(item =>
            item.attribute_value_name === value
        ) as SelectVariantT
        setDataVariants({
            ...dataVariants,
            selectVariant: findAttribute
        })
    }

    function clickSecondAttribute(value: string): void {
        const findAttribute = data.attribute.attribute.find(item =>
            item.attribute_value_second_name === value
        ) as SelectVariantT
        setDataVariants({
            ...dataVariants,
            selectVariant: findAttribute
        })
    }

    const variant = useMemo((): string | undefined => {
        let value
        if (
            dataVariants.selectVariant?.attribute_value_name &&
            !dataVariants?.selectVariant?.attribute_value_second_name
        ) {
            value = dataVariants.selectVariant?.attribute_value_name
        }
        if (dataVariants?.selectVariant?.attribute_value_second_name) {
            value = `${dataVariants.selectVariant?.attribute_value_name}, ${dataVariants?.selectVariant?.attribute_value_second_name}`
        }
        return value
    }, [dataVariants])

    // set quantity actions
    function clickMinus(): void {
        setQuantity(`${Number(quantity) - 1}`)
    }

    function clickPlus(): void {
        setQuantity(`${Number(quantity) + 1}`)
    }

    function handleQuantity(e: ChangeEvent<HTMLInputElement>): void {
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
            setQuantity(newValue)
        } else if (!e.target.value) {
            setQuantity('0')
        }
    }

    const errMessageQty = useMemo((): string | undefined => {
        if (quantity === '0') {
            return 'Minimum purchase of this product is 1 item'
        } else if (Number(quantity) > dataVariants?.selectVariant?.quantity) {
            return `Maximum purchase of this item is ${dataVariants.selectVariant.quantity} items, reduce your purchases, OK!`
        }
    }, [quantity, dataVariants])

    const stock = useMemo((): number => {
        if (data.have_attribute) {
            return dataVariants.selectVariant.quantity
        }
        return 2
    }, [data, dataVariants])

    const subtotal = useMemo((): string => {
        if (data.have_attribute) {
            const currentPrice = dataVariants.selectVariant.price.replace(regexAlphabeticInsideOtherChar, '')
            const calculate = Number(currentPrice) * Number(quantity)
            const formatPrice = formatterCurrency('MYR').format(calculate)
            const result = formatPrice.replace(regexAlphabeticInsideOtherChar, '')
            return `RM${result}`
        }
        return 'RM0'
    }, [
        quantity,
        dataVariants,
        data
    ])

    const isDisabledBtnMinus = useMemo((): boolean => {
        if (Number(quantity) < 2) {
            return true
        } else if (Number(quantity) < 1) {
            return false
        }
        return false
    }, [
        data,
        quantity,
        dataVariants
    ])
    const isDisabledBtnPlus = useMemo((): boolean => {
        if (data.have_attribute) {
            if (Number(quantity) >= dataVariants.selectVariant.quantity) {
                return true
            }
            return false
        }
        return true
    }, [
        data,
        quantity,
        dataVariants
    ])

    async function clickAddToCart(): Promise<void> {
        if (Cookies.get(session_login_name)) {
            if (data.have_attribute) {
                setLoadingSubmit(true)
                const result = await addToCart({
                    item_id: dataVariants.selectVariant.item_id,
                    quantity: Number(quantity)
                })
                if (result?.result) {
                    const result = await getListCart()
                    if (result?.result) {
                        dispatch(addCart(result.data))
                        toast.dismiss()
                        toast.success(result?.message ?? 'Item successfully added to cart.')
                        setLoadingSubmit(false)
                    } else {
                        toast.dismiss()
                        toast.error(result?.message ?? 'There is an error. please try again')
                        setLoadingSubmit(false)
                    }
                } else if (!result?.result) {
                    toast.dismiss()
                    toast.error(result?.message ?? 'There is an error. please try again')
                    setLoadingSubmit(false)
                }
            }
        } else {
            router.push('/login')
        }
    }

    async function handleMobileAddToCart(): Promise<void> {
        if (data.have_attribute) {
            setShowDetailVariant(true)
        } else {
            clickAddToCart()
        }
    }

    function closeDetailVariant(): void {
        setShowDetailVariant(false)
    }

    function clickVariant(item: AttributeValueT): void {
        const findAttribute = data.attribute.attribute.find(attr =>
            attr.attribute_value_name === item.name
        ) as SelectVariantT
        setDataVariants({
            ...dataVariants,
            selectVariant: findAttribute
        })
    }

    function clickSecondVariant(item: AttributeValueT): void {
        const findAttribute = data.attribute.attribute.find(attr =>
            attr.attribute_value_second_name === item.name
        ) as SelectVariantT
        setDataVariants({
            ...dataVariants,
            selectVariant: findAttribute
        })
    }

    useEffect(() => {
        setQuantity('1')
    }, [desktop])

    return (
        <>
            {showDetailVariant &&
                <DetailVariants
                    handler={closeDetailVariant}
                    selectVariant={dataVariants.selectVariant}
                    name={data.name}
                    variant={dataVariants.variant}
                    clickVariant={clickVariant}
                    clickSecondVariant={clickSecondVariant}
                    clickAddToCart={clickAddToCart}
                    loadingSubmit={loadingSubmit}
                />
            }
            <div className="grid grid-cols-1 screen-tm1-lg:grid-cols-4 gap-4 screen-tm1-lg:gap-8 pb-8 pt-8">
                <ProductPreview
                    images={data.images}
                    productName={data.name}
                />
                <ProductContent
                    dataVariants={dataVariants}
                    desc={data.description}
                    name={data.name}
                    // discount={discount}
                    price={data.price}
                    // img={img}
                    image={''}
                    has_discount={data.has_discount}
                    clickFirstAttribute={clickFirstAttribute}
                    clickSecondAttribute={clickSecondAttribute}
                />
                <AddToCart
                    image={dataVariants?.selectVariant?.image}
                    variant={variant}
                    stock={`${stock}`}
                    subtotal={subtotal}
                    clickMinus={clickMinus}
                    clickPlus={clickPlus}
                    onChange={handleQuantity}
                    value={quantity}
                    errMessage={errMessageQty}
                    isDisabledBtnAddToCart={(errMessageQty ? true : false) || loadingSubmit}
                    loadingSubmit={loadingSubmit}
                    have_attribute={dataVariants?.variant?.length > 0}
                    isDisabledBtnMinus={isDisabledBtnMinus}
                    isDisabledBtnPlus={isDisabledBtnPlus}
                    clickAddToCart={clickAddToCart}
                    errResponseAddToCart={errResponseAddToCart}
                    desc={data.description}
                    productName={data.name}
                />
                <AddToCartMobile
                    handleMobileAddToCart={handleMobileAddToCart}
                    loading={loadingSubmit}
                    isDisabled={data?.quantity === 0}
                />
            </div>
        </>
    )
}