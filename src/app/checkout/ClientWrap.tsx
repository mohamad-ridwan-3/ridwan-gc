'use client'

import { ContactDetailT, CountriesT, GroupIconsT, PaymentMethodsT } from "@/src/types/checkout"
import { formatterCurrency, regexAlphabeticInsideOtherChar, staticImages } from "@/src/utils"
import { ChangeEvent, useMemo, useState } from "react"
import RightContent from "./right-content/RightContent"
import { useFormik } from "formik"
import NewLeftContent from "./left-content/NewLeftContent"
import { ListCustomerAddressT } from "@/src/types/profile"
import { CouriersT, ResultShippingRateT } from "@/src/types/order"
import { ResultGetListCartT } from "@/src/types/cart"
import MobileBtnCreateOrder from "./MobileBtnCreateOrder"
import createOrder from "@/src/lib/server-actions/order/createOrder"
import toast from "react-hot-toast"

type Props = {
    defaultAddress: ListCustomerAddressT
    shippingRateData: ResultShippingRateT
    carts: ResultGetListCartT
}

export default function ClientWrap({
    defaultAddress,
    shippingRateData,
    carts
}: Props) {
    // left state
    const [isCreateAccount, setIsCreateAccount] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [isSignIn, setIsSignIn] = useState<boolean>(false)
    const [loadingCreateOrder, setLoadingCreateOrder] = useState<boolean>(false)
    const [selectCourier, setSelectCourier] = useState<CouriersT>(
        shippingRateData?.data?.couriers?.length > 0 ?
        shippingRateData.data.couriers[0] : 
        {} as CouriersT
    )
    const [countries, setCountries] = useState<CountriesT[]>([
        {
            name: 'United States',
            value: 'us'
        },
        {
            name: 'Indonesia',
            value: 'id'
        },
        {
            name: 'Malaysia',
            value: 'my'
        }
    ])
    const [state, setState] = useState<CountriesT[]>([
        {
            name: 'Amazonas',
            value: 'id'
        },
        {
            name: 'Apure',
            value: 'my'
        }
    ])
    const [activePayment, setActivePayment] = useState<PaymentMethodsT>({
        name: 'Card'
    })
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethodsT[]>([
        {
            icon: 'ion:card',
            name: 'Card'
        },
        {
            image: `${staticImages}/icons/payment-card/paypal.svg`,
            name: 'PayPal'
        }
    ])
    const [isBillingAddress, setIsBillingAddress] = useState<boolean>(false)
    const [cardIcons, setCardIcons] = useState<GroupIconsT[]>([
        {
            image: `${staticImages}/icons/payment-card/visa.svg`,
        },
        {
            image: `${staticImages}/icons/payment-card/stripe.svg`,
        },
        {
            image: `${staticImages}/icons/payment-card/amex.svg`,
        },
        {
            image: `${staticImages}/icons/payment-card/unionpay.svg`,
        },
    ])
    const [contactDetails, setContactDetails] = useState<ContactDetailT>({
        cardNumber: ''
    })

    const formik = useFormik({
        initialValues: {
            cardNumber: '',
            expiration: '',
            cvc: ''
        },
        onSubmit: (values) => {

        }
    })

    function changeIsCreateAccount(e: ChangeEvent<HTMLInputElement>): void {
        setIsCreateAccount(!isCreateAccount)
    }

    const imgURL = process.env.NEXT_PUBLIC_PREFIX

    function HandleSelectCourier(courier: PaymentMethodsT | CouriersT):void{
        setSelectCourier(courier as CouriersT)
    }

    async function handleCreateOrder():Promise<void>{
        setLoadingCreateOrder(true)
        const result = await createOrder({
            address_id: defaultAddress.id,
            service_id: selectCourier.service_id,
            note: 'ASAP'
        })
        if(!result.result){
            toast.dismiss()
            toast.error(result.message)
            setLoadingCreateOrder(false)
            return
        }
        window.open(result.data.redirect, '_self')
    }

    const total = useMemo((): string=>{
        const shippingCost = selectCourier.price.replace(regexAlphabeticInsideOtherChar, '')
        const calculated = carts.data.subtotal_int + Number(shippingCost)
        const total = formatterCurrency('MYR').format(calculated).replace(regexAlphabeticInsideOtherChar, '')
        return `RM${total}`
    }, [selectCourier])

    return (
        <>
            <div
                className="grid screen-tm1-lg:grid-cols-2 min-h-screen relative"
            // onSubmit={(e)=>e.preventDefault()}
            >
                <NewLeftContent
                    defaultAddress={defaultAddress}
                    shippingRateData={shippingRateData}
                    selectCourier={selectCourier}
                    handleSelectCourier={HandleSelectCourier}
                    carts={carts}
                />
                {/* hidden */}
                {/* <LeftContent
                    isCreateAccount={isCreateAccount}
                    changeIsCreateAccount={changeIsCreateAccount}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    isSignIn={isSignIn}
                    setIsSignIn={setIsSignIn}
                    countries={countries}
                    state={state}
                    isBillingAddress={isBillingAddress}
                    setIsBillingAddress={setIsBillingAddress}
                    paymentMethods={paymentMethod}
                    activePayment={activePayment}
                    setActivePayment={setActivePayment}
                    cardIcons={cardIcons}
                    formik={formik}
                /> */}
                <RightContent
                    carts={carts}
                    selectCourier={selectCourier}
                    total={total}
                    handleCreateOrder={handleCreateOrder}
                    loading={loadingCreateOrder}
                />
                <MobileBtnCreateOrder
                    handleCreateOrder={handleCreateOrder}
                    total={total}
                    loading={loadingCreateOrder}
                />
            </div>
        </>
    )
}