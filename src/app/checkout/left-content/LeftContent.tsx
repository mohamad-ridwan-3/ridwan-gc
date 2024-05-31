import { CountriesT, GroupIconsT, PaymentMethodsT } from "@/src/types/checkout"
import { ChangeEvent, Dispatch, SetStateAction } from "react"
import HeaderPage from "../HeaderPage"
import Title from "../Title"
import { Button, Typography } from "@material-tailwind/react"
import TextInput from "@/src/components/inputs/TextInput"
import CheckboxLabel from "@/src/components/inputs/CheckboxLabel"
import SelectInput from "@/src/components/selects"
import PaymentCard from "./PaymentCard"
import Image from "next/image"
import { regexAlphabetic, regexCardNumber, regexNumber, regexSpace, staticImages, validateCardNumber } from "@/src/utils"
import Iconify from "@/src/components/Iconify"

type LeftContentProps = {
    isCreateAccount: boolean
    changeIsCreateAccount: (e: ChangeEvent<HTMLInputElement>) => void
    showPassword: boolean
    setShowPassword: Dispatch<SetStateAction<boolean>>
    isSignIn: boolean
    setIsSignIn: Dispatch<SetStateAction<boolean>>
    countries: CountriesT[]
    state: CountriesT[]
    isBillingAddress: boolean
    setIsBillingAddress: Dispatch<SetStateAction<boolean>>
    paymentMethods: PaymentMethodsT[]
    activePayment: PaymentMethodsT
    setActivePayment: Dispatch<SetStateAction<PaymentMethodsT>>
    cardIcons: GroupIconsT[]
    formik: any
}

export default function LeftContent({
    isCreateAccount,
    changeIsCreateAccount,
    showPassword,
    setShowPassword,
    isSignIn,
    setIsSignIn,
    countries,
    state,
    isBillingAddress,
    setIsBillingAddress,
    paymentMethods,
    activePayment,
    setActivePayment,
    cardIcons,
    formik
}: LeftContentProps) {
    function validateInputCardNumber(e: ChangeEvent<HTMLInputElement>): void {
        if (e.target.value.length > 0 && e.target.value.length <= 19 && regexCardNumber.test(e.target.value)) {
            formik.setFieldValue('cardNumber', validateCardNumber(e.target.value))
        } else if (e.target.value.length === 0) {
            formik.setFieldValue('cardNumber', '')
        }
    }

    function validateInputExpiration(e: ChangeEvent<HTMLInputElement>): void {
        const value = e.target.value
        if (value.length <= 7 && !regexAlphabetic.test(value)) {
            let output = ''
            if (value.length === 1 && Number(value) > 1) {
                output = `0${value} / `
            } else if (value.length >= 4 && value.length < 5) {
                output = value.substr(0, 2)
            } else if (value.length === 2 && Number(value.substr(0, 2)) === 0) {
                output = value.substr(0, 1)
            } else if (
                value.length === 2 &&
                Number(value.substr(0, 1)) === 0 &&
                Number(value.substr(0, 2)) > 1
            ) {
                output = `${value} / `
            } else if (value.length === 2 && Number(value.substr(1, 1)) > 2) {
                output = value.substr(0, 1)
            } else if (value.length === 2) {
                output = `${value} / `
            } else if (value.length === 3 && value.substr(0, 3) !== '') {
                if (regexNumber.test(value.substr(2, 1))) {
                    output = `${value.substr(0, 2)} / ${value.substr(2, 1)}`
                } else {
                    output = `${value.substr(0, 2)} / `
                }
            } else {
                output = value
            }
            formik.setFieldValue('expiration', output)
        }
    }

    return (
        <div className="bg-white pt-8 px-8 pb-20 border-r flex justify-end">
            <div className="screen-tm1-lg:w-[36rem] w-full">
                <HeaderPage />

                {isSignIn &&
                    <>
                        <div className="flex justify-between flex-wrap mb-4 mt-6 pt-4">
                            <Title
                                title="Sign in"
                                className="mb-0"
                            />

                            <div className="gap-1.5 flex flex-wrap">
                                <Typography
                                    placeholder=""
                                    onPointerEnterCapture=""
                                    onPointerLeaveCapture=""
                                    className="text-[#000] font-normal font-inter mb-0"
                                >

                                    New customer?
                                </Typography>
                                <button
                                    className="font-semibold font-inter"
                                    onClick={() => setIsSignIn(false)}
                                >
                                    Guest checkout
                                </button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <TextInput
                                title="Email"
                                isRequired
                                type="email"
                                classInput="shadow-sm"
                                // txtDesc="Required field"
                                classTxtDesc="text-red-500"
                            />

                            <TextInput
                                title="Password (minimum 8 characters)"
                                type={showPassword ? 'text' : 'password'}
                                isRequired
                                classInput="shadow-sm"
                                // txtDesc="Required field"
                                classTxtDesc="text-red-500"
                                icon={`${showPassword ? 'ph:eye-light' : 'ph:eye-slash-light'}`}
                                clickIcon={() => setShowPassword(!showPassword)}
                            />
                        </div>

                        <div className="flex justify-end mt-4">
                            <div className="flex items-center gap-4">
                                <button className="font-inter font-semibold">
                                    Forgot password?
                                </button>

                                <Button
                                    placeholder=""
                                    onPointerEnterCapture=""
                                    onPointerLeaveCapture=""
                                    className="rounded-md shadow-none normal-case font-inter hover:opacity-[0.95] text-sm py-2 px-4 font-medium"
                                >
                                    Sign in
                                </Button>
                            </div>
                        </div>
                    </>
                }
                {!isSignIn &&
                    <>
                        <div className="py-4 mt-6">
                            <div className="flex justify-between flex-wrap mb-4">
                                <Title
                                    title="Contact details"
                                    className="mb-0"
                                />

                                <div className="gap-1.5 flex flex-wrap">
                                    <Typography
                                        placeholder=""
                                        onPointerEnterCapture=""
                                        onPointerLeaveCapture=""
                                        className="text-[#000] font-normal font-inter mb-0"
                                    >

                                        Already have an account?
                                    </Typography>
                                    <button
                                        className="font-semibold font-inter"
                                        onClick={() => setIsSignIn(true)}
                                    >
                                        Sign in
                                    </button>
                                </div>
                            </div>

                            <div className="gap-4">
                                <TextInput
                                    title="Email"
                                    isRequired
                                    type="email"
                                    classInput="shadow-sm"
                                    // txtDesc="Required field"
                                    classTxtDesc="text-red-500"
                                />

                                <CheckboxLabel
                                    label="I want to create account"
                                    checked={isCreateAccount}
                                    onChange={changeIsCreateAccount}
                                />

                                {isCreateAccount &&
                                    <div className="mt-2 mb-4">
                                        <TextInput
                                            title="Password (minimum 8 characters)"
                                            type={showPassword ? 'text' : 'password'}
                                            isRequired
                                            classInput="shadow-sm"
                                            // txtDesc="Required field"
                                            classTxtDesc="text-red-500"
                                            icon={`${showPassword ? 'ph:eye-light' : 'ph:eye-slash-light'}`}
                                            clickIcon={() => setShowPassword(!showPassword)}
                                        />
                                    </div>
                                }
                                <div className="h-px w-full border-t mt-2"></div>
                            </div>
                        </div>

                        <Title title="Shipping address" className="mb-0" />
                        <div className="space-y-3 mt-4">
                            <SelectInput
                                options={countries}
                                value="United States"
                                title="Country"
                                classSelect="shadow-sm"
                            />
                            <TextInput
                                title="First name"
                                isRequired
                                type="text"
                                classInput="shadow-sm"
                                // txtDesc="Required field"
                                classTxtDesc="text-red-500"
                            />
                            <TextInput
                                title="Last name"
                                isRequired
                                type="text"
                                classInput="shadow-sm"
                                // txtDesc="Required field"
                                classTxtDesc="text-red-500"
                            />
                            <TextInput
                                title="Company"
                                type="text"
                                classInput="shadow-sm"
                            />
                            <TextInput
                                title="Street address"
                                isRequired
                                type="text"
                                classInput="shadow-sm"
                                // txtDesc="Required field"
                                classTxtDesc="text-red-500"
                            />
                            <TextInput
                                title="Street address (continue)"
                                type="text"
                                classInput="shadow-sm"
                            />
                            <TextInput
                                title="City"
                                isRequired
                                type="text"
                                classInput="shadow-sm"
                                // txtDesc="Required field"
                                classTxtDesc="text-red-500"
                            />
                            <TextInput
                                title="Zip code"
                                isRequired
                                type="text"
                                classInput="shadow-sm"
                                // txtDesc="Required field"
                                classTxtDesc="text-red-500"
                            />
                            <SelectInput
                                options={state}
                                value="Amazonas"
                                title="State"
                                classSelect="shadow-sm"
                            />
                            <TextInput
                                title="Phone number"
                                type="text"
                                classInput="shadow-sm"
                            />
                            <CheckboxLabel
                                label="Use shipping address as billing address"
                                checked={isBillingAddress}
                                onChange={() => setIsBillingAddress(!isBillingAddress)}
                            />
                            {/* not use billing address */}
                            {!isBillingAddress &&
                                <>
                                    <Title title="Billing address" className="mb-0" />
                                    <SelectInput
                                        options={countries}
                                        value="United States"
                                        title="Country"
                                        classSelect="shadow-sm"
                                    />
                                    <TextInput
                                        title="First name"
                                        isRequired
                                        type="text"
                                        classInput="shadow-sm"
                                        // txtDesc="Required field"
                                        classTxtDesc="text-red-500"
                                    />
                                    <TextInput
                                        title="Last name"
                                        isRequired
                                        type="text"
                                        classInput="shadow-sm"
                                        // txtDesc="Required field"
                                        classTxtDesc="text-red-500"
                                    />
                                    <TextInput
                                        title="Company"
                                        type="text"
                                        classInput="shadow-sm"
                                    />
                                    <TextInput
                                        title="Street address"
                                        isRequired
                                        type="text"
                                        classInput="shadow-sm"
                                        // txtDesc="Required field"
                                        classTxtDesc="text-red-500"
                                    />
                                    <TextInput
                                        title="Street address (continue)"
                                        type="text"
                                        classInput="shadow-sm"
                                    />
                                    <TextInput
                                        title="City"
                                        isRequired
                                        type="text"
                                        classInput="shadow-sm"
                                        // txtDesc="Required field"
                                        classTxtDesc="text-red-500"
                                    />
                                    <TextInput
                                        title="Zip code"
                                        isRequired
                                        type="text"
                                        classInput="shadow-sm"
                                        // txtDesc="Required field"
                                        classTxtDesc="text-red-500"
                                    />
                                    <SelectInput
                                        options={state}
                                        value="Amazonas"
                                        title="State"
                                        classSelect="shadow-sm"
                                    />
                                    <TextInput
                                        title="Phone number"
                                        type="text"
                                        classInput="shadow-sm"
                                    />
                                </>
                            }
                            <div className="h-px w-full border-t mt-2"></div>
                            {/* Delivery methods */}
                            <div className="space-y-2">
                                <Title title="Delivery methods" className="mb-0" />
                                <Typography
                                    placeholder=""
                                    onPointerEnterCapture=""
                                    onPointerLeaveCapture=""
                                    className="font-normal font-inter"
                                >
                                    Please fill in shipping address to see available shipping methods
                                </Typography>
                            </div>
                            <div className="h-px w-full border-t mt-2"></div>
                            <Title title="Payment methods" className="mb-0" />
                            {/* <div className="grid grid-cols-2 space-x-2 pt-3">
                                {paymentMethods.map((item, i) => {
                                    return (
                                        <PaymentCard
                                            key={i}
                                            name={item.name}
                                            icon={item?.icon}
                                            image={item?.image}
                                            activePayment={activePayment}
                                            setActivePayment={setActivePayment}
                                        />
                                    )
                                })}
                            </div> */}
                            {/* input from selection payment */}
                            {activePayment.name === 'Card' &&
                                <>
                                    <div className="flex flex-col gap-3">
                                        <div>
                                            <Typography
                                                onPointerEnterCapture=""
                                                onPointerLeaveCapture=""
                                                placeholder=""
                                                className="text-xs font-inter mb-1"
                                            >
                                                Card number*
                                            </Typography>

                                            <div className="flex border pr-2 rounded-md overflow-hidden shadow-sm overflow-x-auto">
                                                <input
                                                    type="tel"
                                                    name="cardNumber"
                                                    placeholder="1234 1234 1234 1234"
                                                    className="font-inter text-sm p-2.5 w-full border-none outline-none"
                                                    onChange={validateInputCardNumber}
                                                    value={formik.values.cardNumber}
                                                />
                                                <div className="space-x-1 flex items-center">
                                                    {cardIcons.map((item, i) => (
                                                        <Image
                                                            key={i}
                                                            src={item.image as string}
                                                            alt="card icon"
                                                            height={40}
                                                            width={40}
                                                            className="object-contain max-h-full max-w-full"
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid sm:grid-cols-2 gap-3">
                                            <TextInput
                                                title="Expiration"
                                                type="tel"
                                                name="expiration"
                                                isRequired
                                                classInput="shadow-sm"
                                                // txtDesc="Required field"
                                                classTxtDesc="text-red-500"
                                                placeholder="MM / YY"
                                                onChange={validateInputExpiration}
                                                onPaste={(e) => e.preventDefault()}
                                                value={formik.values.expiration}
                                            />
                                            <TextInput
                                                title="CVC"
                                                type="text"
                                                isRequired
                                                classInput="shadow-sm"
                                                name="cvc"
                                                // txtDesc="Required field"
                                                classTxtDesc="text-red-500"
                                                icon={`subway:id-card`}
                                                placeholder="CVC"
                                                classIcon="text-gray-400"
                                                onChange={(e) => {
                                                    if (regexNumber.test(e.target.value) && e.target.value.length <= 4) {
                                                        formik.setFieldValue('cvc', e.target.value)
                                                    }else if(e.target.value.length <= 4){
                                                        formik.setFieldValue('cvc', '')
                                                    }
                                                }}
                                                value={formik.values.cvc}
                                            />
                                        </div>
                                    </div>
                                </>
                            }
                            {activePayment.name === 'PayPal' &&
                                <div className="border rounded-md shadow-sm p-3">
                                    <Image
                                        src={`${staticImages}/icons/payment-card/paypal.svg`}
                                        alt="paypal"
                                        height={35}
                                        width={35}
                                    />
                                    <Typography
                                        placeholder=""
                                        onPointerEnterCapture=""
                                        onPointerLeaveCapture=""
                                        className="font-apple-system font-normal text-[#30313D] py-3 border-b"
                                    >
                                        PayPal selected.
                                    </Typography>

                                    <div className="flex mt-3 items-center gap-3">
                                        <div>
                                            <Iconify
                                                icon="iconoir:reload-window"
                                                height={35}
                                                width={35}
                                                className="text-gray-500"
                                            />
                                        </div>
                                        <Typography
                                            placeholder=""
                                            onPointerEnterCapture=""
                                            onPointerLeaveCapture=""
                                            className="font-inter font-normal text-gray-600 text-sm"
                                        >
                                            After submission, you will be redirected to securely complete next steps.
                                        </Typography>
                                    </div>
                                </div>
                            }
                            <div>
                                <Button
                                    placeholder=""
                                    onPointerEnterCapture=""
                                    onPointerLeaveCapture=""
                                    size="lg"
                                    className="rounded-md shadow-none normal-case font-inter font-semibold tracking-wide w-full hover:opacity-[0.96] transition-all mt-4"
                                >
                                    Pay now
                                </Button>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}